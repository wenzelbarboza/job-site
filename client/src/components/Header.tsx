import { Link } from "react-router-dom";

export const Header = () => {
  return (
    <>
      <nav className="flex justify-between">
        <Link to={"/"}>this is the logo</Link>
        <div className="flex justify-between bg-blue-300 ml-10">
          <p>new link</p>
          <p>new link</p>
          <p>new link</p>
          <p>new link</p>
          <p>new link</p>
        </div>
      </nav>
    </>
  );
};
