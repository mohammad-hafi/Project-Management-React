type PaginateProps = {
  PageNumberChange: (value: number) => void;
  PageNumber: number;
  TotalPage: number;
};

export default function Paginate({
  PageNumberChange,
  PageNumber,
  TotalPage,
}: PaginateProps) {
  return (
    <nav className="pagination" aria-label="Project pagination">
      <button
        onClick={() => PageNumberChange(PageNumber - 1)}
        disabled={PageNumber === 1}
      >
        Previous
      </button>

      <span className="pagination-status">
        Page {PageNumber} of {TotalPage}
      </span>

      <button
        onClick={() => PageNumberChange(PageNumber + 1)}
        disabled={PageNumber === TotalPage}
      >
        Next
      </button>
    </nav>
  );
}
