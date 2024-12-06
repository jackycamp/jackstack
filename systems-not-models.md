inspired by: https://www.youtube.com/watch?v=vRTcE19M-KE

Marketing heavily focused on the "model".
https://blog.google/technology/ai/google-gemini-ai/#sundar-note
https://openai.com/index/introducing-openai-o1-preview/
https://ai.meta.com/blog/meta-llama-3-1/
https://aws.amazon.com/blogs/aws/introducing-amazon-nova-frontier-intelligence-and-industry-leading-price-performance/

There's a ton of marketing out there regarding model params,
how big the context window is, etc.

It's interesting that this is the focus because it's actually only a single component
of the entire system that users interact with. Frankly, it's an oversimplification, and
I get it...

Perhaps most people simply won't engage with other technical metrics regarding the system like:

- "We have N designated Kubernetes clusters per region that have M instances of the model running"
- "We have 3 smaller models acting as moderation nodes in the cluster"
- "We're utilizing WebRTC to connect you directly to the model for low-latency audio/media streaming and here's a bunch of details about the setup"[^1]

But I'd be happy as peaches to read about that! Cool as heck!

Admittedly though, this would be giving away quite a bit of information and "tricks". But the thing is,
these kinds of complex systems take a long time to build.

Which brings me to the main point, the underlying model itself is not the company's moat --
the arrangement, the deployment, the streaming -- the entire software system is.

[^1]: LiveKit basically did this on [Hacker News](https://news.ycombinator.com/item?id=41743327) which was pretty cool. It would also be cool if openai discussed this in more detail in the context of their systems.
