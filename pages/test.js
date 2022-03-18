import Box from "../components/Box"
import Nav1 from "../components/Nav1";
import {useRouter} from "next/router";

const test = () => {
    const router = useRouter();

    const {
        query:{colour,id}
    } = router;
      
    const props = {
        colour,
        id
    }


    return (
        <div>
        <Nav1 />
       <div className="div1" style={{ position: "relative" }}>
       <Box colour={props.colour} />
      </div>
    </div>
    )
}

export default test;