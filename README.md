# sockscale
A project directed to those who intend to scale socket based backends. you can use kubernetes you can implement it with an autoscaling group or any autoscaling server from any cloud provider as long as you stick with the basic needs.
## Stats
this implementation achieved 20ms mean response time by scaling the sockscale-deployments up to 10 replicas
## Basics
All you need is a scalable socket server along with a message broker (I used Redis for this task). to allow users connecting on different socket servers still communicating with each other.
Along with that you need to encapsulate your server with a scaling service for the orchestration of your container. (Could be kubernetes could be swarm whatever you like. It won't really matter).
## Architecture
One Redis instance as a message broker (if you ever needed to scale the redis instance you can configure a redis cluster without the need to add more code to the server)
Multiple Server instances.
### For Kubernetes
- the redis instance is encapsulated by a deployment and a headless service to configure its hostname within the cluster to be "redisq" as to be reachable from anywhere inside the cluster
- the sockscale server is encapsulated by a deployment for easing the scaling process along with a LoadBalancer service to handle request routing to the scaled servers. Also this load balancer is configured to use ```sessionAffinity: ClientIP``` so that a client sticks to a server once he connected to it because you know sockets can get really stateful sometimes. All with this hassle comes a Horizontal Pod Autoscaler, nevermind the name it just automatically scales your server according to the load your server is handling making your server automatically scalable to serve a huge number of users!
