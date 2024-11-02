import React, { useState, useEffect, useContext } from 'react'
import { z } from 'zod';
import { authContext } from '../../context/AuthContext';


//defining debounce hook

function useDebounce(value, delay) {
  const [debounceValue, setDebounceValue] = useState(value);


  useEffect(() => {
    const handler = setTimeout(() => {
      setDebounceValue(value);
    }, delay);

    return () => {
      clearTimeout(handler);
    }
  }, [value, delay]);


  return debounceValue;

}


const AddMemberForm = () => {

  const { setSignUser, addingMember, setAddingMember, allMembers, setAllMembers, totalMembers, setTotalMembers, teamName } = useContext(authContext);


  //this is the where the object is storing all the members
  const [input, setInput] = useState([{ f_0: "", email_0: "", },]);


  const [valid, setValid] = useState(undefined);
  const [tempInput, setTempInput] = useState("");
  const [error, setError] = useState({});


  //making the schema for zod validation of email
  const Member = z.object({
    f_name: z.string().min(3, "Name should be atleast 3 letters long"),
    email_name: z.string().email()
  })

  //debounced balue of tempInput 

  const debouncedInput = useDebounce(tempInput, 500);


  const handleInputChange = (e, idx) => {
    const { name, value } = e.target;

    //update tempInput for debouncing 
    setTempInput(value);

    setInput(prev => {
      const newInput = [...prev];
      newInput[idx] = { ...newInput[idx], [name]: value };
      return newInput;
    });
  }

  const handleAddMember = (e) => {
    e.preventDefault();

    setInput(prev => [...prev, {
      [`f_${input.length}`]: "",
      [`email_${input.length}`]: ""
    }])
  }

  //function to add the members to the backend
  const addMember = async (memberData) => {
    const response = await fetch("http://localhost/taskAPI/add-member", {
      method: "POST",
      credentials: "include",
      headers: {
        'Content-Type': "application/json",
        'Accept': "application/json"
      },
      body: JSON.stringify(memberData)
    });

    if (response.ok) {
      setTotalMembers(prev => prev + 1);
      console.log(`added member no. ${totalMembers} `);
    }
  }

  /**
   1. setLoading(true) - this is when we'll do the work 
   2. flow createTeam signs up teh user -> that'll get the user the axstoken -> form where we can store  the info of the user data 
      and also we have to make sure theat the request of adding members hits after the user in signed in coz otherwise we won't have a leaderId to work with
      wait we actually don't need to store the leaderID coz i think that kinda data cookies will send by themselves -- witness the magic of cookies rn
   */



  const handleCreateTeam = (e) => {
    e.preventDefault();
    setSignUser(true);




  }


  useEffect(() => {
    if (addingMember) {

      //finally adding all the members to the context
      input.f_0.length > 0 && input.forEach((member, i) => {
        //checking if the user have both first and last name or not 

        const name = member[`f_${i}`].split(/\s+/);
        let first = '';
        let last = '';
        if (name.length > 1) {
          first = name[0];
          last = name[1];
        } else {
          first = name[0];
        }

        const memberData = {
          first_name: first,
          last_name: last,
          email: member[`email_${i}`],
          team_name: teamName,
          role: "member"
        }
        addMember(memberData);
        setAllMembers(prev => ([...prev, member[`email_${i}`]]));
        
      });

      setAddingMember(false);
      

    }
  },[totalMembers, allMembers])

  useEffect(() => {
    if (debouncedInput) {
      input.forEach((member, idx) => {
        const currentMember = {
          f_name: member[`f_${idx}`] || "",
          email_name: member[`email_${idx}`] || ""
        };


        const validation = Member.safeParse(currentMember);
        if (validation.success) {
          // Clear errors if validation is successful
          setError(prev => {
            const updatedErrors = { ...prev };
            delete updatedErrors[`f_${idx}`];
            delete updatedErrors[`email_${idx}`];
            return updatedErrors;
          });
        } else {
          const validationErrors = validation.error.format();

          setError(prev => ({
            ...prev,
            [`f_${idx}`]: validationErrors.f_name?._errors[0],
            [`email_${idx}`]: validationErrors.email_name?._errors[0]
          }));
        }

        setValid(validation.success);
      })

    }
  }, [debouncedInput]);


  return (
    <div className="addMember-master-container">
      <div className="addForm-container">
        <form >
          {input.map((ele, i) => {
            const fieldName = `f_${i}`;
            const emailName = `email_${i}`;

            return <div key={i} className="credentials-container">
              <div className="credentials">

                <input type="text" style={{ color: error[fieldName] ? 'red' : 'green' }} name={`f_${i}`} placeholder='Member Name' value={ele[`f_${i}`]} onChange={(e) => { handleInputChange(e, i) }} />
                <input type='text' style={{ color: error[emailName] ? 'red' : 'green' }} name={`email_${i}`} placeholder='Email' value={ele[`email_${i}`]} onChange={(e) => { handleInputChange(e, i) }}></input>
              </div>

            </div>
          })}
        </form>
        <button onClick={handleAddMember} > Add another</button>
      </div>
      <hr />
      <button onClick={handleCreateTeam} className='createButton' > Create Team</button>




    </div>
  )
}

export default AddMemberForm



