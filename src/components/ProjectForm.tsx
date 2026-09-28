type ProjectFormProps = {
  name: string;
  description: string;
  priorityLevel: number;
  startDate: string;
  targetDate: string;
  isCreating: boolean;
  createError: string;
  isEditing: boolean;

  onNameChange: (value: string) => void;
  onDescriptionChange: (value: string) => void;
  onPriorityLevelChange: (value: number) => void;
  onStartDateChange: (value: string) => void;
  onTargetDateChange: (value: string) => void;

  onSubmit: (event: React.FormEvent<HTMLFormElement>) => void;
  onCancelEdit: () => void;
};

export default function ProjectForm({
  name,
  description,
  priorityLevel,
  startDate,
  targetDate,
  isCreating,
  createError,
  isEditing,
  onNameChange,
  onDescriptionChange,
  onPriorityLevelChange,
  onStartDateChange,
  onTargetDateChange,
  onSubmit,
  onCancelEdit,
}: ProjectFormProps) {
  return (
    <form className="project-form" onSubmit={onSubmit}>
      <div className="form-heading">
        <div>
          <p className="workspace-eyebrow">{isEditing ? "Project settings" : "New project"}</p>
          <h2>{isEditing ? "Refine the plan" : "Start something clear"}</h2>
        </div>
        {isEditing && <button className="button-quiet" type="button" onClick={onCancelEdit}>Cancel</button>}
      </div>

      <div className="form-field form-field-wide">
        <label htmlFor="name">Name</label>
        <input
          id="name"
          type="text"
          value={name}
          onChange={(event) => onNameChange(event.target.value)}
          required
        />
      </div>

      <div className="form-field form-field-wide">
        <label htmlFor="description">Description</label>
        <textarea
          id="description"
          value={description}
          onChange={(event) => onDescriptionChange(event.target.value)}
          required
        />
      </div>

      <div className="form-field">
        <label htmlFor="priorityLevel">Priority Level</label>
        <select
          id="priorityLevel"
          value={priorityLevel}
          onChange={(event) =>
            onPriorityLevelChange(Number(event.target.value))
          }
        >
          <option value={1}>Low</option>
          <option value={2}>Medium</option>
          <option value={3}>High</option>
          <option value={4}>Urgent</option>
          <option value={5}>Critical</option>
        </select>
      </div>

      <div className="form-field">
        <label htmlFor="startDate">Start Date</label>
        <input
          id="startDate"
          type="date"
          value={startDate}
          onChange={(event) => onStartDateChange(event.target.value)}
          required
        />
      </div>

      <div className="form-field">
        <label htmlFor="targetDate">Target Date</label>
        <input
          id="targetDate"
          type="date"
          value={targetDate}
          onChange={(event) => onTargetDateChange(event.target.value)}
          required
        />
      </div>

      {createError && <p className="form-error" role="alert">{createError}</p>}

      <div className="form-actions">
      <button className="button-primary" type="submit" disabled={isCreating}>
        {isCreating
          ? "Saving..."
          : isEditing
            ? "Update Project"
            : "Create Project"}
      </button>
      </div>
    </form>
  );
}
