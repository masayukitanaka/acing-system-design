import { useState } from 'react'
import './App.css'

function App() {
  const [sidebarOpen, setSidebarOpen] = useState(false)

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen)
  }

  const closeSidebar = () => {
    setSidebarOpen(false)
  }

  return (
    <>
      {/* Hamburger Menu Button */}
      <button
        className={`hamburger ${sidebarOpen ? 'open' : ''}`}
        onClick={toggleSidebar}
        aria-label="Toggle menu"
      >
        <span></span>
        <span></span>
        <span></span>
      </button>

      {/* Sidebar Navigation */}
      <nav className={`sidebar ${sidebarOpen ? 'open' : ''}`}>
        <h2>Table of Contents</h2>
        <ul>
          <li>
            <a href="#chapter1" onClick={closeSidebar}>
              Chapter 1: Introduction
            </a>
          </li>
          <li>
            <a href="#chapter2" onClick={closeSidebar}>
              Chapter 2: Scalability
            </a>
          </li>
          <li>
            <a href="#chapter3" onClick={closeSidebar}>
              Chapter 3: Databases
            </a>
          </li>
          <li>
            <a href="#chapter4" onClick={closeSidebar}>
              Chapter 4: Caching
            </a>
          </li>
          <li>
            <a href="#chapter5" onClick={closeSidebar}>
              Chapter 5: Load Balancing
            </a>
          </li>
          <li>
            <a href="#chapter6" onClick={closeSidebar}>
              Chapter 6: Microservices
            </a>
          </li>
        </ul>
      </nav>

      {/* Overlay */}
      {sidebarOpen && (
        <div className="overlay" onClick={closeSidebar}></div>
      )}

      {/* Main Content */}
      <main className="content">
        <article id="chapter1">
          <h1>Chapter 1: Introduction to System Design</h1>
          <p>
            System design is the process of defining the architecture, components, modules,
            interfaces, and data for a system to satisfy specified requirements. It requires
            a systematic approach to building scalable, reliable, and maintainable systems.
          </p>
          <p>
            In this guide, we'll explore the fundamental concepts and best practices that
            will help you ace system design interviews and build better software systems.
            Understanding these principles is crucial for any software engineer looking to
            advance their career.
          </p>
          <p>
            We'll cover topics ranging from basic scalability concepts to advanced distributed
            systems patterns. Each chapter builds upon the previous one, providing a comprehensive
            understanding of modern system design.
          </p>
        </article>

        <article id="chapter2">
          <h1>Chapter 2: Scalability Principles</h1>
          <p>
            Scalability is the capability of a system to handle a growing amount of work by
            adding resources to the system. There are two main types of scalability: vertical
            scaling (scaling up) and horizontal scaling (scaling out).
          </p>
          <p>
            Vertical scaling involves adding more power to existing machines, such as CPU, RAM,
            or storage. While this approach is simpler, it has physical limitations and can
            become expensive. Horizontal scaling, on the other hand, involves adding more
            machines to your pool of resources.
          </p>
          <p>
            Modern applications typically favor horizontal scaling because it offers better
            fault tolerance and can be more cost-effective. However, horizontal scaling
            introduces complexity in terms of data consistency and coordination between nodes.
          </p>
        </article>

        <article id="chapter3">
          <h1>Chapter 3: Database Design and Selection</h1>
          <p>
            Choosing the right database is one of the most critical decisions in system design.
            The choice between SQL and NoSQL databases depends on your specific use case, data
            structure, and scalability requirements.
          </p>
          <p>
            SQL databases like PostgreSQL and MySQL offer ACID guarantees and are excellent
            for structured data with complex relationships. They provide powerful querying
            capabilities through SQL and are well-suited for transactional systems.
          </p>
          <p>
            NoSQL databases like MongoDB, Cassandra, and Redis offer different trade-offs.
            They typically prioritize availability and partition tolerance over consistency
            (following the CAP theorem), making them ideal for distributed systems requiring
            high scalability.
          </p>
        </article>

        <article id="chapter4">
          <h1>Chapter 4: Caching Strategies</h1>
          <p>
            Caching is a technique used to store frequently accessed data in a fast-access
            storage layer. Implementing effective caching can dramatically improve system
            performance and reduce database load.
          </p>
          <p>
            Common caching strategies include cache-aside, write-through, write-behind, and
            refresh-ahead. Each strategy has its own trade-offs in terms of consistency,
            performance, and complexity.
          </p>
          <p>
            Popular caching solutions include Redis, Memcached, and CDNs for static content.
            The key to successful caching is understanding your access patterns and choosing
            the appropriate eviction policy (LRU, LFU, FIFO).
          </p>
        </article>

        <article id="chapter5">
          <h1>Chapter 5: Load Balancing</h1>
          <p>
            Load balancing distributes incoming network traffic across multiple servers to
            ensure no single server bears too much demand. This improves responsiveness and
            availability of applications.
          </p>
          <p>
            Common load balancing algorithms include round-robin, least connections, IP hash,
            and weighted round-robin. The choice of algorithm depends on your specific
            requirements and infrastructure.
          </p>
          <p>
            Modern load balancers like NGINX, HAProxy, and cloud-based solutions (AWS ELB,
            Google Cloud Load Balancing) offer advanced features such as health checks, SSL
            termination, and session persistence.
          </p>
        </article>

        <article id="chapter6">
          <h1>Chapter 6: Microservices Architecture</h1>
          <p>
            Microservices architecture breaks down applications into small, independent services
            that communicate through well-defined APIs. This approach offers benefits in terms
            of scalability, maintainability, and team autonomy.
          </p>
          <p>
            Each microservice owns its data and business logic, making it easier to develop,
            test, and deploy independently. However, this architecture introduces challenges
            in service discovery, inter-service communication, and distributed data management.
          </p>
          <p>
            Key technologies in the microservices ecosystem include Docker for containerization,
            Kubernetes for orchestration, and service meshes like Istio for managing
            service-to-service communication.
          </p>
        </article>
      </main>
    </>
  )
}

export default App
