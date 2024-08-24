import { Link } from "react-router-dom";

export const Header = () => {
  return (
    <>
      <nav className="w-full h-16 flex items-center justify-between">
        <div className=" max-w-12">
          <Link to={"/"}>
            <img src="../../public/logo.png" className="h-full w-full" alt="" />
          </Link>
        </div>
        <div className="flex justify-between gap-2  ml-10">
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
