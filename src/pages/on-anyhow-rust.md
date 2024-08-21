name:On Anyhow in Rust
date:07/04/2024
label:programming

# On Anyhow in Rust

I was developing a rust cli for work and noticed several of the functions seemed pretty inflated due to
the same attempts at error handling. Usually this was around generically handling `Result<Error>` types.

In application code, it's pretty common to "attempt" a function; if it errors, propagate the
error, otherwise, continue. This is pretty hard to do without a bunch of boilerplate.

Unless you use the `anyhow` crate.

Consider the following function that attempts to propagate `Result<Error>` at various places.

```rust
pub async fn from_local_cookies() -> Result<Self, Box<dyn std::error::Error>> {
    let mut cookies_path = get_dir().expect("could not get config dir");
    cookies_path.push("cookies.json");

    let file_res = std::fs::File::open(cookies_path.clone()).map(std::io::BufReader::new);
    if file_res.is_err() {
        let e = file_res.unwrap_err();
        return Err(Box::new(e));
    }

    let cookie_store_res = reqwest_cookie_store::CookieStore::load_json(file_res.unwrap());
    if cookie_store_res.is_err() {
        let e = cookie_store_res.unwrap_err();
        return Err(Box::new(e));
    }

    let cookie_store_mtx = reqwest_cookie_store::CookieStoreMutex::new(cookie_store_res.unwrap());
    let cookie_store_arc = std::sync::Arc::new(cookie_store_mtx);

    let client_init = reqwest::Client::builder()
        .cookie_store(true)
        .cookie_provider(std::sync::Arc::clone(&cookie_store_arc))
        .build();

    match client_init {
        Ok(client) => {
            let config = MyConfig::new();
            Ok(Self { config, client })
        }
        Err(e) => Err(Box::new(e)),
    }
}
```

As you can see, this code is pretty inflated, lots of distractions from the core logic.

With `anyhow`, the code above becomes:

```rust
pub async fn from_local_cookies_with_anyhow() -> Result<Self> {
    let mut cookies_path = get_dir()?;
    cookies_path.push("cookies.json");
    let cookies_file = std::fs::File::open(cookies_path).map(std::io::BufReader::new)?;
    let cookies_store = reqwest_cookie_store::CookieStore::load_json(cookies_file)
        .map_err(|e| anyhow::anyhow!("failed to load cookies from json: {:?}", e))?;
    let cookies_store_mtx = reqwest_cookie_store::CookieStoreMutex::new(cookies_store);
    let cookies_store_arc = std::sync::Arc::new(cookies_store_mtx);
    let client = reqwest::Client::builder()
        .cookie_store(true)
        .cookie_provider(std::sync::Arc::clone(&cookies_store_arc))
        .build()?;
    let config = PyroConfig::new();

    Ok(Self { config, client })
}
```

Isn't that a thing of beauty?
