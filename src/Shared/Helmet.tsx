import { HelmetProps } from "../Interface";

const Helmet: React.FC<HelmetProps> = (props) => {
  document.title = "Tot-" + props.title;
  return <div>{props.children}</div>;
};

export default Helmet;
