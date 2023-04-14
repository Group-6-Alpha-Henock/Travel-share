import { useState, useEffect } from "react";
import './App.css';
import axios from "axios";
import Navbar from "./comps/Navbar";



function App() {
  // Create a state to store data from server with default value of null
  const [travels, setTravels] = useState(null);

  // Use useEffect to fetch data as soon as the page loads
  useEffect(() => {
    fetchTravels();
  }, []);

  // Function to fetch data
  const fetchTravels = async () => {
    try {
      // Fetch the data using axios
      const res = await axios.get("http://localhost:8000/travel");

      // Set the data in the state
      setTravels(res.data.travel);
      // console.log(res) to see the fetched data
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  // State for the form data
  const [storyForm, setStoryForm] = useState({
    title: '',
    content: '',
  });

  // Function to update the storyForm
  const updateStoryForm = async (e) => {
    const { name, value } = e.target;
    // We need to change the setStoryForm state to the updated value
    setStoryForm({
      ...storyForm,
      [name]: value,
    });
  };
///////////////////////////////////////////////////////create//////////
  // Function to create a new travel story
  const createTravels = async (e) => {
    e.preventDefault();
    // Use axios to send the form data to the server for creating a new story
    try {
      await axios.post("http://localhost:8000/travel", storyForm);
      // Fetch the updated data after creating a new story
      fetchTravels();
      // Reset the form data to empty after clicking on submit
      setStoryForm({ title: '', content: '' });
      
      
    } catch (error) {
      console.error("Error creating travel story:", error);
    }
  };

///////////////////////////////////////////////////////delete///////////
// deleting the created notes
const deleteTravel = async(_id) => {
  //this is to delete the travels
    const res= await axios.delete('http://localhost:8000/travel/'+_id);
    console.log(res);
    
    //update the state and remove the one that is created
    // the ... is the duplicate of the travels
    const newTravel = [...travels].filter((travels) => {
      return travels._id !==_id
    });
    setTravels(newTravel);
};

///////////////////////////////////////////////////////////update///////////////
  // State for the updating the travel data
  const [updateForm, setUpdateForm] = useState({
    _id : null,
    title: '',
    content: '',
  });

  // change function for updateForm which will handle changes to the travel

  const handleUpdateForm =  (e) => {
    const {name, value} = e.target;

    setUpdateForm({
      ...updateForm,
      [name]: value
    });
  };

// editing the created travel data


const toBeUpdated = (travel) => {
      
  setUpdateForm({title: travel.title, content: travel.content, _id: travel._id});

};


const updateTravel =async(e)=> {
  const {title, content} = updateForm;
  //edit button functionality 
   e.preventDefault(e);
  try {
    const res= await axios.put(`http://localhost:8000/travel/${updateForm._id}`, {title, content});
    // Fetch the updated data after updating the story
    fetchTravels();
    console.log(res)
    // Reset the updateForm data to empty after clicking on submit
    setUpdateForm({title: '', content: '' });
  } catch (error) {
    console.error('Error updating travel story:', error);
  }
};





  return (
    <div className="App">
      <header className="App-header">
        <Navbar></Navbar>
      </header>
      <div>
    
        
     
       
      <h2>Stories:</h2>
       {travels && 
         travels.map((travel) => (
        
            <div key={travel._id} >
              <h3>{travel.title}</h3>
              <h4>{travel.content}</h4>
              <button onClick={() => toBeUpdated(travel)}>
                Edit
              </button>
              <button onClick={() => deleteTravel(travel._id)}>
                Delete
              </button>
            </div>
       
          ))
        }
      
      </div>

        {updateForm._id &&(
        <div>
        <form onClick={updateTravel}>
          <input  onChange={handleUpdateForm}
                  name="title" 
                  value={updateForm.title} />
          <textarea onChange={handleUpdateForm}
                    name="content" 
                    value={updateForm.content}/>

          <button type="submit" > Update </button>
        </form>
        </div> 
        )}
        {!updateForm._id &&(
          <div>
          
            <h1>Share your travel story here:</h1>
              <form onSubmit={createTravels}>
                  <input  onChange={updateStoryForm}
                          name="title" 
                          value={storyForm.title} />
                  <textarea onChange={updateStoryForm}
                            name="content" 
                            value={storyForm.content}/>

                  <button type="submit" > Post a Story </button>
              </form>
          </div>
        )}

    </div>
  );
}

export default App;
