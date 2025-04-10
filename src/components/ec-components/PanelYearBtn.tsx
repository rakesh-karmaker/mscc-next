const YearPanel = (props: {
  panelYear: string;
  onClick: () => void;
}) => {
  return (
    <button
      className="panel-year"
      data-year={props.panelYear}
      onClick={props.onClick}
      type="button"
      aria-label={`Toggle executives panel of year ${props.panelYear}`}
    >
      {props.panelYear}
    </button>
  );
};

export default YearPanel;
