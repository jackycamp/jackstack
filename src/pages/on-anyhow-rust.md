name:On Anyhow in Rust
date:07/04/2024
label:programming

# On Anyhow in Rust

## Why anyhow might save you (and those that read your rust code) some cognitive cycles.

I noticed several of my functions comprised of the same boilerplate error handling checks;
where I was `.unwrap_err()` on particular `Result`'s.

Here's a glaring example:

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

As you can see, this code is pretty inflated.

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
