import Sur from "../components/Sur";
import Nav1 from "../components/Nav1";
import Fiber from "../components/Fiber";
import SpringFiber from "../components/SpringFiber";
import Envir from "../components/Envir";
import Envir1 from "../components/Envir1";

const sur = () => {
  return (
    <div>
      <Nav1 />
      <div className="sur" style={{ position: "absolute" }}>
        {/* <Sur /> */}
        {/* <Fiber /> */}
        <SpringFiber />
        {/* <Envir /> */}
        {/* <Envir1 /> */}
      </div>
    </div>
  );
};

export default sur;
