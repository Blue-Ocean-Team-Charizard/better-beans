import { useState } from "react";
export default function CreateReviewForm() {
  const [body, setBody] = useState("");

  const handleSubmit = () => {
    axios.post(`the post API`, { params: `params` }).then((response) => {
      return "added";
    });
  };

  return <div>{`Review form`}</div>;
}
