import React, {useState, useEffect , createContext} from 'react';
import Axios from  "axios";
import { useSelector } from 'react-redux';
import { useDispatch } from "react-redux"
import { setInfo} from "../slices/colourSlice";
import Link from 'next/link';
import styles from '../styles/Users.module.scss' ;
import Logout from "./Logout";

const Credential = ({setUlist}) => {
    const dispatch = useDispatch();
    const [listUsers,setListUsers] = useState( [] );
    const [name,setName] = useState("");
    const [email,setEmail] = useState(""); 
    const [password,setPassword] = useState(""); 
    const [confirmpassword,setConfirmpassword] = useState(""); 
    const [mismatch,setMismatch] = useState("");
    const [clash,setClash] = useState(""); 

    const [colour,setColour] = useState("white");
    const [sides,setSides] = useState(0);


    const status = useSelector((state)=>state.colour.login);
    const info = useSelector((state)=>state.colour.info);

    useEffect(()=>{
        Axios.get("http://localhost:3001/test").then(
            (response)=>{
                setListUsers(response.data);
            }
        )
    },[]);
   
    const createUser = () =>{
         Axios.post("http://localhost:3001/save",{
             name,
             email,
             password,
             confirmpassword,
             colour,
             sides
         }).then(
             (response)=>{
                     setClash("");
                     if(response.data==="Password mismatch"){
                        setMismatch("Mismatch");
                     }else{
                        console.log(response);
                        setListUsers([...listUsers,{
                        name,
                        email
                        }]);
                        setMismatch("");
                     }
             }
         ).catch((err)=>{
            console.log("Email already exist");
            setClash("Email already used");
            setMismatch("");
         })
         ;
    }

    const [uemail,setUemail] = useState("");
    const [upassword,setUpassword] = useState("");
    const [icred,setIcred] = useState("");
    const findUser = () =>{
        Axios.post("http://localhost:3001/find",{
            uemail,
            upassword,
        }).then(
            (response)=>{
                       
                    //    setListUsers([response.data]);
                       setIcred("");
                       setUlist([response.data]);
                       dispatch(setInfo(response.data));          
            }
        ).catch((err)=>{
            setIcred("Invalid Credentials");
        })
        ;
   }

    return (
        <>
        <div className={styles.credential} >
           {!status && <div className="userDisplay" className={styles.list}>
               <h2>List Of Users</h2>
                {listUsers.map((user)=>{
                    return(
                        <div key={user.email} >
                            <h3>Name : {user.name}</h3>
                            <h4>Email : {user.email}</h4>
                        </div>
                    )
                })}
            </div>}
            {status && <div className={styles.dash}>
            <div className={styles.dashcontent}>
            <div><h3>Hi</h3><h1>{info.name}</h1></div>
            <Link href="/koka">
                    <a className={styles.power}>Power</a>
            </Link>
            </div>
            <div className={styles.dashout}>
            <Logout />
            </div>
            </div>}

        {!status &&
        <div className={styles.container}>
           <div className={styles.formContainer , styles.signUpContainer}
            // style={{display:"block"}} 
            >
               <h1>Signup</h1>
               <input type="text" placeholder="Name" onChange={(event)=>{
                   setName(event.target.value);
               }}/>
               <input type="email" placeholder="Email" onChange={(event)=>{
                   setEmail(event.target.value);
               }}/>
               <input type="text" placeholder="Password" onChange={(event)=>{
                   setPassword(event.target.value);
               }}/>
               <input type="text" placeholder="Confirm Password" onChange={(event)=>{
                   setConfirmpassword(event.target.value);
               }}/>
               <br/>
               <button onClick={createUser}>Create User</button>
               <div>{mismatch}{clash}</div>
           </div>
           
           
           <div className={styles.signUpContainer} >
               <h1>Login</h1>
               <input type="email" placeholder="Email" onChange={(event)=>{
                   setUemail(event.target.value);
               }}/>
               <input type="text" placeholder="Password" onChange={(event)=>{
                   setUpassword(event.target.value);
               }}/>
               <br/>
               <button onClick={
                   ()=>{findUser();
                    }}>Login</button>
               {icred}
           </div>

         </div>}

        
         <div className={styles.circles}></div>
        </div>

        

        {/* <div className={styles.area}>
        <div className={styles.circles}>   
        </div>
        </div > */}
        
</>
    )
}
export default Credential
