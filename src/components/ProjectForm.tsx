type ProjectFormProps = {
  name: string;
  description: string;
  statusId: number;
  priorityLevel: number;
  startDate: string;
  targetDate: string;
  isCreating: boolean;
  createError: string;
  isEditing: boolean;

  onNameChange: (value: string) => void;
  onDescriptionChange: (value: string) => void;
  onStatusIdChange: (value: number) => void;
  onPriorityLevelChange: (value: number) => void;
  onStartDateChange: (value: string) => void;
  onTargetDateChange: (value: string) => void;

  onSubmit: (event: React.FormEvent<HTMLFormElement>) => void;
  onCancelEdit: () => void;
};

export default function ProjectForm({
  name,
  description,
  statusId,
  priorityLevel,
  startDate,
  targetDate,
  isCreating,
  createError,
  isEditing,
  onNameChange,
  onDescriptionChange,
  onStatusIdChange,
  onPriorityLevelChange,
  onStartDateChange,
  onTargetDateChange,
  onSubmit,
  onCancelEdit,
}: ProjectFormProps) {
  return (
    <form className="project-form" onSubmit={onSubmit}>
      <h2>{isEditing ? "Edit Project" : "Create Project"}</h2>

      <div>
        <label htmlFor="name">Name</label>
        <input
          id="name"
          type="text"
          value={name}
          onChange={(event) => onNameChange(event.target.value)}
          required
        />
      </div>

      <div>
        <label htmlFor="description">Description</label>
        <textarea
          id="description"
          value={description}
          onChange={(event) => onDescriptionChange(event.target.value)}
          required
        />
      </div>

      <div>
        <label htmlFor="statusId">Status ID</label>
        <input
          id="statusId"
          type="number"
          value={statusId}
          onChange={(event) => onStatusIdChange(Number(event.target.value))}
          required
        />
      </div>

      <div>
        <label htmlFor="priorityLevel">Priority Level</label>
        <input
          id="priorityLevel"
          type="number"
          value={priorityLevel}
          onChange={(event) =>
            onPriorityLevelChange(Number(event.target.value))
          }
          required
        />
      </div>

      <div>
        <label htmlFor="startDate">Start Date</label>
        <input
          id="startDate"
          type="datetime-local"
          value={startDate}
          onChange={(event) => onStartDateChange(event.target.value)}
          required
        />
      </div>

      <div>
        <label htmlFor="targetDate">Target Date</label>
        <input
          id="targetDate"
          type="datetime-local"
          value={targetDate}
          onChange={(event) => onTargetDateChange(event.target.value)}
          required
        />
      </div>

      {createError && <p>{createError}</p>}

      <button type="submit" disabled={isCreating}>
        {isCreating
          ? "Saving..."
          : isEditing
            ? "Update Project"
            : "Create Project"}
      </button>

      {isEditing && (
        <button type="button" onClick={onCancelEdit}>
          Cancel Edit
        </button>
      )}
    </form>
  );
}
