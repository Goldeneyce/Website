function span(key, text, marks = []) {
  return { _key: key, _type: "span", text, marks };
}

function block(key, text, style = "normal", options = {}) {
  return {
    _key: key,
    _type: "block",
    style,
    markDefs: [],
    children: [span(`${key}-span`, text)],
    ...options,
  };
}

module.exports = [
  {
    id: "starter-choosing-the-right-elevator",
    slug: "choosing-the-right-elevator-for-your-building",
    title: "How to Choose the Right Elevator for Your Building",
    excerpt:
      "A practical guide to matching elevator capacity, speed, layout, and long-term support to the real needs of a building.",
    category: "Planning",
    author: "Everest World Lifts",
    featured: true,
    publishedAt: "2026-06-10T09:00:00.000Z",
    imageUrl: "/assets/images/site/passenger-elevator.webp",
    imageAlt: "Modern passenger elevator cabin",
    body: [
      block(
        "choose-01",
        "Choosing an elevator is an early building-planning decision, not simply an equipment purchase. The right system should serve the people, traffic patterns, operating hours, and future needs of the property.",
      ),
      block("choose-02", "Start With the Building's Purpose", "h2"),
      block(
        "choose-03",
        "An apartment building, hospital, hotel, office, and warehouse each place different demands on vertical transportation. Passenger numbers, accessibility needs, service movement, and peak traffic periods should all shape the specification.",
      ),
      block("choose-04", "Estimate Capacity and Traffic", "h2"),
      block(
        "Capacity should be based on expected daily use and peak periods, not only the number of floors. A correctly planned system reduces waiting times, avoids unnecessary energy use, and helps prevent equipment from being repeatedly overloaded.",
      ),
      block("choose-05", "Plan the Space Early", "h2"),
      block(
        "The shaft, pit, headroom, machine-room requirements, electrical supply, and access routes must be coordinated with the wider building design. Early technical input helps avoid expensive structural changes later in the project.",
      ),
      block("choose-06", "Consider Long-Term Support", "h2"),
      block(
        "Installation is only the beginning of an elevator's working life. Before selecting equipment, confirm that trained technicians, preventive maintenance, spare parts, and responsive technical support will remain available.",
      ),
      block("choose-07", "Make Safety the Deciding Factor", "h2"),
      block(
        "The final choice should comply with relevant safety requirements and suit the building's actual operating conditions. A dependable lift partner should explain the options clearly and recommend a solution that balances performance, safety, and lifecycle value.",
      ),
    ],
  },
  {
    id: "starter-preventive-maintenance",
    slug: "preventive-elevator-maintenance-guide",
    title: "Preventive Elevator Maintenance: A Guide for Facility Managers",
    excerpt:
      "What facility managers should expect from a preventive maintenance programme and why regular attention protects safety and uptime.",
    category: "Maintenance",
    author: "Everest World Lifts",
    featured: true,
    publishedAt: "2026-06-06T09:00:00.000Z",
    imageUrl: "/assets/images/site/maintenance-technician.webp",
    imageAlt: "Technician carrying out elevator maintenance",
    body: [
      block(
        "maintain-01",
        "Elevators are complex systems that work repeatedly throughout the day. Preventive maintenance identifies wear, adjustment needs, and emerging faults before they become disruptive failures.",
      ),
      block("maintain-02", "What Preventive Maintenance Covers", "h2"),
      block(
        "A maintenance visit should include systematic inspection, cleaning, lubrication, adjustment, and testing of safety and operating components. The exact work depends on the equipment type, usage level, age, and service history.",
      ),
      block("maintain-03", "Keep Accurate Service Records", "h2"),
      block(
        "Facility teams should maintain a clear record of visits, faults, repairs, replaced parts, and recommendations. Good records reveal recurring issues and support informed decisions about repairs, budgets, and eventual modernization.",
      ),
      block("maintain-04", "Respond to Warning Signs", "h2"),
      block(
        "Unusual noise, vibration, uneven stopping, slow doors, repeated shutdowns, or changes in ride quality should be reported promptly. Continuing to operate equipment with an unresolved issue can increase damage and risk.",
      ),
      block("maintain-05", "Control Access to Equipment Areas", "h2"),
      block(
        "Machine rooms, control equipment, shafts, and pits should only be accessed by authorised people. Facility managers should also keep these areas dry, clear, secure, and suitable for technicians to work safely.",
      ),
      block("maintain-06", "Measure Maintenance by Reliability", "h2"),
      block(
        "A strong maintenance programme is proactive, documented, and responsive. Its value is seen in safer operation, fewer avoidable breakdowns, improved ride quality, and a longer useful equipment life.",
      ),
    ],
  },
  {
    id: "starter-modernization-signs",
    slug: "when-to-modernize-an-existing-elevator",
    title: "When Should an Existing Elevator Be Modernized?",
    excerpt:
      "Key signs that an older elevator may need targeted upgrades or a wider modernization programme.",
    category: "Modernization",
    author: "Everest World Lifts",
    featured: false,
    publishedAt: "2026-06-02T09:00:00.000Z",
    imageUrl: "/assets/images/site/commercial-elevator-lobby.webp",
    imageAlt: "Commercial lobby with multiple elevator doors",
    body: [
      block(
        "modern-01",
        "Modernization updates important parts of an existing elevator while retaining suitable elements of the original installation. It can improve reliability, safety, accessibility, energy performance, and the passenger experience.",
      ),
      block("modern-02", "Breakdowns Are Becoming Frequent", "h2"),
      block(
        "Repeated service interruptions often indicate that components are wearing out or that the system is becoming difficult to support. When repairs are increasingly frequent, a planned upgrade can be more effective than continuing with reactive work.",
      ),
      block("modern-03", "Parts Are Difficult to Source", "h2"),
      block(
        "Older control systems and proprietary components may become obsolete. If replacement parts have long lead times or are no longer available, reliability can suffer and each breakdown may take longer to resolve.",
      ),
      block("modern-04", "Performance No Longer Meets Expectations", "h2"),
      block(
        "Slow travel, inaccurate floor levelling, rough ride quality, poor door operation, and excessive waiting times can all affect how people experience the building. Modern controls and drive equipment can significantly improve operation.",
      ),
      block("modern-05", "The Building's Needs Have Changed", "h2"),
      block(
        "A building may now serve more occupants, require better accessibility, or operate for longer hours than it did when the elevator was installed. Modernization should respond to today's use while allowing for future demand.",
      ),
      block("modern-06", "Plan the Upgrade Before Failure", "h2"),
      block(
        "The best modernization projects are planned before the equipment reaches a critical condition. A technical assessment can identify priorities, define a realistic scope, and help schedule the work around the building's operations.",
      ),
    ],
  },
];
