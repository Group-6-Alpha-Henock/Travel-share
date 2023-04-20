import { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.css";
import axios from "axios";
import Navbar from "../comps/Navbar";

function UserPosts() {
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
    title: "",
    content: "",
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
      setStoryForm({ title: "", content: "" });
    } catch (error) {
      console.error("Error creating travel story:", error);
    }
  };

  ///////////////////////////////////////////////////////delete///////////
  // deleting the created notes
  const deleteTravel = async (_id) => {
    //this is to delete the travels
    const res = await axios.delete("http://localhost:8000/travel/" + _id);
    console.log(res);

    //update the state and remove the one that is created
    // the ... is the duplicate of the travels
    const newTravel = [...travels].filter((travels) => {
      return travels._id !== _id;
    });
    setTravels(newTravel);
  };

  ///////////////////////////////////////////////////////////update///////////////
  // State for the updating the travel data
  const [updateForm, setUpdateForm] = useState({
    _id: null,
    title: "",
    content: "",
  });

  // change function for updateForm which will handle changes to the travel

  const handleUpdateForm = (e) => {
    const { name, value } = e.target;

    setUpdateForm({
      ...updateForm,
      [name]: value,
    });
  };

  // editing the created travel data

  const toBeUpdated = (travel) => {
    setUpdateForm({
      title: travel.title,
      content: travel.content,
      _id: travel._id,
    });
  };

  const updateTravel = async (e) => {
    const { title, content } = updateForm;
    //edit button functionality
    e.preventDefault(e);
    try {
      const res = await axios.put(
        `http://localhost:8000/travel/${updateForm._id}`,
        { title, content }
      );
      // Fetch the updated data after updating the story
      fetchTravels();
      console.log(res);
      // Reset the updateForm data to empty after clicking on submit
      setUpdateForm({ title: "", content: "" });
    } catch (error) {
      console.error("Error updating travel story:", error);
    }
  };

  ////////////////////////////

  return (
    <div className="App   container">
      <Navbar></Navbar>
      <div>
        <h2 className="text-primary" >Stories:</h2>
        {travels &&
          travels.map((travel) => (
            <div  className="text-black bg-secondary mb-3" key={travel._id}>
              <h2>{travel.title}</h2>
              
                <img src="" alt="..." className="img-thumbnail" />
              
              <h4>{travel.content}</h4>
              <button
                type="button" className="btn btn-warning  m-3 p-3"
               
                onClick={() => toBeUpdated(travel)}
              >
                Edit
              </button>
              <button
                type="button" className="btn btn-danger  m-3 p-3"
                onClick={() => deleteTravel(travel._id)}
              >
                Delete
              </button>
            </div>
          ))}
      </div>

      {updateForm._id && (
        <div>
          <form onClick={updateTravel}>
            <input
            className="m-1 p-3 input-group input-group-lg"
              onChange={handleUpdateForm}
              name="title"
              value={updateForm.title}
            />
            <textarea
              className="m-1 p-5 input-group-text input-group input-group-lg"
              onChange={handleUpdateForm}
              name="content"
              value={updateForm.content}
            />

            <button type="submit"
            className="rounded border-primary text-bg-primary p-3 m-2"
            > Update </button>
          </form>
        </div>
      )}
      {!updateForm._id && (
        <div>
          <h1>Share your travel story here:</h1>
          <form onSubmit={createTravels}>
            Title:
            <input
              className="m-1 p-3 input-group input-group-lg"
              placeholder="Travel title"
              onChange={updateStoryForm}
              name="title"
              value={storyForm.title}
            /><br/>
            Select Image:
            <span className="input-group-text">
              <input type="file" className="custom-file-input" id="inputGroupFile01"/>
            </span> 
            Content:
            <textarea
              className="m-1 p-5 input-group-text input-group input-group-lg"
              placeholder="content of the story"
              onChange={updateStoryForm}
              name="content"
              value={storyForm.content}
            /><br/>
            <button
              className="rounded border-primary text-bg-primary p-3 m-2"
              type="submit"
            >
              {" "}
              Post a Story{" "}
            </button>
          </form>
        </div>
      )}
    </div>
  );
}

export default UserPosts;
