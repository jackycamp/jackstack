# Resume

## Jack Campanella - Senior Software Engineer

I am the go-to person when a hard problem needs to be solved. Like a fine-tooth
comb, I separate and survey the layers and strands of complex systems and code-bases.
I am the catalyst for systems that both serve users and provides business value.
I am the eternal learner, a technical archmage, a sage of systems.

Languages: Rust, Elixir, Python, Typescript.

Tools: Kubernetes, AWS, React, Phoenix, Prefect, Postgres.

Boston, MA

### Pyrologix (Acquired by Vibrant Planet) - Senior Software Engineer

July 2023 - Present

I lead the 0 to 1 full-stack effort of a new SAAS product resulting in several 6-figure
contract negotiations. This product provides various types of users (B2C and B2B) an effortless
way to view wildfire data and risk information for an area of interest.

I lead the deployment of a workflow orchestration framework (prefect) on our compute platform, giving
engineers a fast and efficient way to write and deploy pipelines while making them accessible to end-users
when needed. This was directly attributable to an increase in pipeline development iteration speed and, dare I say,
developer happiness.

I maintained the company's compute platform as the number of users 3x'ed.

I helped grow the engineering team from 2 members to 6 members.

I helped the parent company's engineering team implement and test kubernetes cluster-autoscaling
resulting in an investment in their own compute platform allowing them to move away compute from
astronomer, resulting in thousands of dollars saved monthly.

I wrote a python sdk that gave users programmatic access to the company's compute platform.
Enabling users to more efficiently create and run dozens of jobs at once.

### Pyrologix - Software Engineer

Aug 2022 - July 2023

I lead the scaling, stabilization, and automation of the core data pipelines
the company used for their professional services and analytics.

I lead the development of an internal application that served as an interface for the core
data pipelines which was directly attributable to increased user productivity - some projects
that might take months in data processing now took a few days.

I lead the design and implementation of the company's internal compute platform. With
auto-scaling kubernetes clusters in EKS at the core of this system, users could perform modeling
on nation-wide datasets in just a few hours (normally took weeks to months).

Due to the low operating cost of the compute platform and the ease of distributing
the modeling and data-processing, more and more projects had a higher profit margin, from 15-20% to 30-50%
while allowing for faster project turn around (from months to weeks). Ultimately, this enabled the company
to serve more clients compounding on project profitability.

I lead the observability effort for the compute platform -- implementing monitoring, logging,
and metrics gathering using Prometheus and Grafana.

I lead the integration of the company's on-prem servers into the compute platform, using k3s,
which enabled even lower-cost modeling/data-processing for some projects.

I wrote a rust-based cli that gave users a programmatic interface into this system that
was easily portable to unix and windows based operating systems.

### Acho - Software Engineer

Nov 2021 - Aug 2022

I enhanced a business-analytics platform called Acho Studio. The platform enabled users
to import raw data from existing data repositories, connect with other data sources,
transform if needed, and ultimately gain insights from visualizations or reports they built
from their data.

I lead the development of the visualization/insights functionality of the platform which
was directly attributable to an increase in user time spent on the platform.

I spearheaded support for collaboration across larger teams with the goal of increasing seat count.
I implemented full-stack logic enabling users to see where their coworkers were on the platform
and what transformations or operations they were performing on the data. With `socket.io` at the core of this
functionality, users could see their teammates' cursors flying across the screen in real-time! This became a highly-marketable
feature leading to a significant increase in engagement and DAU.

I co-developed a highly desirable and user requested feature called the infinite spreadsheet.
With Postgres powering most of the magic behind the scenes, users could take all (or a subset)
of their data sources, and join it in such a way as to create an infinite spreadsheet -- no row or column limit.

I helped bring another product, Acho Marketplace a platform for users to sell vetted and verified data, from 0 to 1.
I also lead the design and implementation of the payment system for this product.

### PrimeLabs - Software Engineer

Oct 2019 - Nov 2021

I enhanced and scaled a [Mass-Spectrometry](https://en.wikipedia.org/wiki/Mass_spectrometry) and [Cheminformatics](https://en.wikipedia.org/wiki/Cheminformatics)
data platform called Prometheus.
The platform was comprised of a React front-end and a Ruby-on-Rails API; behind the scenes was a whole suite of complex
distributed containerized bio and chem algorithms, and data-processing workers running on AWS EC2 instances.

One of the big ticket items was automatic identification of clusters of mass-spec data called Envelopes. Based on
the sequence of Envelopes in a mass-spec run a user could identify compounds in their mixture. The current open-source SOTA algorithms
for this problem were slow, clunky, or inaccurate, so I pioneered a computer vision training pipeline to help identify and group
these Envelopes. The proof of concept/experimentation was done with EfficientDet/RetinaNet but ended up with YOLOv5.

I also lead the development of the [SMILES](https://en.wikipedia.org/wiki/Simplified_Molecular_Input_Line_Entry_System) identification system
and automatic white-labeled report generation functionality. This part of the platform was crucial in order
to finalize bigger deals with companies such as Eli Lilly and was directly attributable to increased
interest from new clients in the pharmaceutical space.

Bachelors Computer Science - University of Montana

Full Academic Scholarship - Billy Merila Scholarship Program

August 2015 - May 2019
