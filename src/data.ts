export {};
const kanban = {
  boards: [
    {
      title: "Platform Launch",
      statuses: [{ title: "todo", color: "#ffff" }],
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
      ],
    },
  ],
};

export default kanban;
