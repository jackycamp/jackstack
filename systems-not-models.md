inspired by: https://www.youtube.com/watch?v=vRTcE19M-KE

It feels like most marketing coming out of "ai" research entities is heavily
"model" focused [^1]. All of these posts seem to be touting "Our most capable model yet!",
"Many parameters, wow! More numbers wow!", "Benchmarks that we probably included in the test set but didn't know it wow!".

Don't mistake me, Reader, I do not intend to undermine the effort and complexity involved in creating these models.
I understand that "quantifiable" metrics can produce engaging headlines. And best to play it safe and just talk about
the model. But model talk has quickly become... tired.

The model is but a single component users interact with. By itself, the llm really does one thing, generate.
Which is not valuable alone.

Perhaps most people simply won't engage with other technical metrics regarding the system like:

- "We have N designated Kubernetes clusters per region that have M instances of the model running"
- "We have 3 smaller models acting as moderation nodes in the cluster"
- "We're utilizing WebRTC to connect you directly to the model for low-latency audio/media streaming and here's a bunch of details about the setup"[^2]

But I'd be happy as peaches to read about that! Cool as heck!

Admittedly though, this would be giving away quite a bit of information and "tricks". But the thing is,
these kinds of complex systems take a long time to build.

Which brings me to the main point, the underlying model itself is not the company's moat,
the arrangement, the deployment, the streaming -- the entire software system is.

[^1]: [o1 preview](tab:https://openai.com/index/introducing-openai-o1-preview/), [llama 3](tab:https://ai.meta.com/blog/meta-llama-3/), [Amazon Nova](tab:https://aws.amazon.com/blogs/aws/introducing-amazon-nova-frontier-intelligence-and-industry-leading-price-performance/), and countless others.

[^2]: LiveKit basically did this on [Hacker News](https://news.ycombinator.com/item?id=41743327) which was pretty cool. It would also be cool if openai discussed this in more detail in the context of their systems.
