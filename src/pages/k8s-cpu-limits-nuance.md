name:Kubernetes CPU limit nuance
date:10/23/23
label:systems

# Kubernetes CPU Limits aren't really limits

### a classic case of someone skimming docs

When I rolled out my first kubernetes cluster it was mainly for scheduling and managing batch jobs. I heard that it was a recommended best practice to "set your resource limits and requests" for more reliable behavior.

"Yep" I thought. "Makes sense to me".

But, I should've read the docs a bit more closely.

See, when I hear the word limit, I think a hard cap. Nothing goes beyond the limit. Through some pain, I learned Kubernetes cpu limits are certainly not hard caps. More like general guidelines to assist the scheduler (and thus leading to higher quality of service or QOS).

