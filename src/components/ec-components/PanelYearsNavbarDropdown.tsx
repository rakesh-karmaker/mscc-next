import { FaChevronDown } from "react-icons/fa6";

export const YearsDropdown = ({ onClick }: { onClick: () => void }) => {
  return (
    <button
      className="year-dropdown"
      onClick={onClick}
      aria-label="Toggle years dropdown"
      type="button"
    >
      <FaChevronDown />
    </button>
  );
};

export const yearsDropdownClick = (years: string[]) => {
  const yearsDropdownButton: HTMLElement | null =
    document.querySelector(".year-dropdown");
  const yearsDropdown: HTMLElement | null = document.querySelector(
    ".executive-panel-container > aside"
  );

  if (!yearsDropdownButton || !yearsDropdown) {
    return;
  }

  yearsDropdownButton.classList.toggle("active");
  yearsDropdown.style.height = yearsDropdownButton.classList.contains("active")
    ? `${40 * years.length}px`
    : "40px";
  yearsDropdown.setAttribute(
    "dropdown-active",
    yearsDropdownButton.classList.contains("active").toString()
  );
};
