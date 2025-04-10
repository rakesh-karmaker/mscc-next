import "./TextContent.css";

const TextContent = ({ content }: { content: string }) => {
  return (
    <div className="content-container">
      <div dangerouslySetInnerHTML={{ __html: content }} />
    </div>
  );
};

export default TextContent;
