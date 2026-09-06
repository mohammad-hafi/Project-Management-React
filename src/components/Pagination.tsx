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
    <div>
      <button
        onClick={() => PageNumberChange(PageNumber - 1)}
        disabled={PageNumber === 1}
      >
        Previous
      </button>

      <span>
        Page {PageNumber} of {TotalPage}
      </span>

      <button
        onClick={() => PageNumberChange(PageNumber + 1)}
        disabled={PageNumber === TotalPage}
      >
        Next
      </button>
    </div>
  );
}
