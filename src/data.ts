export {} 
const kanban = {
  boards: [
    {
      title: "Platform Launch",
      statuses: [{ title: "todo", color: "#ffff" }],
      tasks: [
        {
          title: "",
          description: "",
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