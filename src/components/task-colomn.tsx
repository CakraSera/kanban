type TaskColumnProps = {
    column: 
}

export function TaskColomn(column: TaskColumnProps) {
  const tasksInColumn = tasks.filter((task) => task.status === column.slug);
  const droppableRef =
    column.slug === "TODO"
      ? todoDroppable.setNodeRef
      : column.slug === "IN_PROGRESS"
        ? inProgressDroppable.setNodeRef
        : doneDroppable.setNodeRef;
  console.log("🚀 ~ {columns.map ~ droppableRef:", droppableRef);

  return (
    <div
      key={column.slug}
      ref={droppableRef}
      className="flex flex-col items-center rounded-2xl border-2 p-2"
    >
      <h2 className="text-xl font-bold">{column.name}</h2>
      <ul className="mt-4 h-full space-y-2">
        {tasksInColumn.length == 0 ? (
          <div className="flex h-full items-center justify-center">
            <h3 className="font-bold">No Tasks</h3>
          </div>
        ) : (
          tasksInColumn.map((task) => (
            <li key={task.id}>
              <TaskCard
                task={task}
                onDelete={deleteTask}
                onEdit={editTask}
                onToggleCompletion={changeTaskCompletion}
              />
            </li>
          ))
        )}
      </ul>
    </div>
  );
}
