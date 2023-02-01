export {};
const kanban = {
  boards: [
    {
      title: "Platform Launch",
      statuses: [
        { title: "todo", color: "#ffff" },
        { title: "doing", color: "#f8f6" },
        { title: "done", color: "rgb(0,200,0)" },
      ],
      tasks: [
        {
          title: "Build UI for onboarding flow",
          description:
            "This is a example description for a example task where i can test if the modal displays the Description properly",
          subtasks: [
            { title: "Make Coffe", checked: false },
            { title: "Eat diner", checked: false },
          ],
          status: "todo",
        },
        {
          title: "Design settings and search pages",
          description:
            "This is a example description for a example task where i can test if the modal displays the Description properly",
          subtasks: [{ title: "Make Coffe", checked: false }],
          status: "doing",
        },
        {
          title: "Add account management endpoints",
          description:
            "This is a example description for a example task where i can test if the modal displays the Description properly",
          subtasks: [
            { title: "Make Coffe", checked: false },
            { title: "Make Coffe", checked: false },
            { title: "Make Coffe", checked: true },
          ],
          status: "doing",
        },
      ],
    },
  ],
};

export default kanban;
