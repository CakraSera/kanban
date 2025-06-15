export function AboutRoute() {
  return (
    <div className="mx-auto flex min-h-screen max-w-4xl flex-col items-center justify-center p-8">
      <h1 className="mb-8 text-4xl font-bold">About Kanban</h1>

      <div className="w-full space-y-8">
        {/* Why Section */}
        <section className="rounded-lg bg-white p-6 shadow-md">
          <h2 className="font-semibol mb-4 text-2xl font-semibold">
            Why Kanban?
          </h2>
          <p className="mb-4 text-gray-700">
            Kanban was developed to help teams visualize their work, limit
            work-in-progress, and maximize efficiency. It originated from
            Toyota's production system and has evolved into a powerful project
            management methodology that helps teams:
          </p>
          <ul className="list-inside list-disc space-y-2">
            <li>Reduce waste and eliminate bottlenecks</li>
            <li>Improve workflow and productivity</li>
            <li>Enhance team collaboration and communication</li>
            <li>Deliver value more consistently</li>
          </ul>
        </section>

        {/* How Section */}
        <section className="rounded-lg bg-white p-6 shadow-md">
          <h2 className="mb-4 text-2xl font-semibold">How Kanban Works</h2>
          <p className="mb-4 text-gray-700">
            Kanban operates on a few core principles that make it effective:
          </p>
          <ul className="list-inside list-disc space-y-2 text-gray-700">
            <li>Visualize your workflow using a Kanban board</li>
            <li>Limit work in progress to prevent overload</li>
            <li>Manage and optimize flow</li>
            <li>Make policies explicit</li>
            <li>Implement feedback loops</li>
            <li>Improve collaboratively</li>
          </ul>
        </section>

        {/* What Section */}
        <section className="rounded-lg bg-white p-6 shadow-md">
          <h2 className="mb-4 text-2xl font-semibold">What We Offer</h2>
          <p className="mb-4 text-gray-700">
            Our Kanban platform provides you with:
          </p>
          <ul className="list-inside list-disc space-y-2 text-gray-700">
            <li>Intuitive drag-and-drop interface</li>
            <li>Customizable boards and columns</li>
            <li>Task prioritization and categorization</li>
            <li>Progress tracking and analytics</li>
            <li>Team collaboration features</li>
            <li>Real-time updates and notifications</li>
          </ul>
        </section>
      </div>
    </div>
  );
}
