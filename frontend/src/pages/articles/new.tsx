import { FormEvent, useState } from "react";
import formStyles from "../../styles/Form.module.scss";
import axios from "axios";


// Suggesting an article via the form.
// Couple notes:
//  1) We don't necessarily need to do any format checking as the product is supposed to
//     have moderators physically checking the submissions.
const NewDiscussion = () => {
  const [title, setTitle] = useState("");
  const [authors, setAuthors] = useState<string[]>([]);
  const [category, setCategory] = useState("");
  const [source, setSource] = useState("");
  const [pubYear, setPubYear] = useState<number>(0);
  const [doi, setDoi] = useState("");
  const [claim, setClaim] = useState("");
  const [evidence, setEvidence] = useState("");
  const [summary, setSummary] = useState("");

  const submitNewArticle = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    // after the submit button is clicked, the form data is sent here to then be sent to the backend via axios

    const articleData = {
      title,
      authors,
      category,
      source,
      publication_year: pubYear,
      doi,
      claim,
      evidence,
      summary,
    }

    try {
      const response = await axios.post('https://speed-backend-1.vercel.app/articles', articleData);

    } catch (error) {
      console.error('Error submitting the article:', error);
    }
  };

  // Some helper methods for the authors array

  const addAuthor = () => {
    setAuthors(authors.concat([""]));
  };

  const removeAuthor = (index: number) => {
    setAuthors(authors.filter((_, i) => i !== index));
  };

  const changeAuthor = (index: number, value: string) => {
    setAuthors(
      authors.map((oldValue, i) => {
        return index === i ? value : oldValue;
      })
    );
  };

  // Return the full form
  return (
    <div className="container">
      <h1>New Article</h1>
      <form className={formStyles.form} onSubmit={submitNewArticle}>
        <label htmlFor="title">Title:</label>
        <input
          className={formStyles.formItem}
          type="text"
          name="title"
          id="title"
          value={title}
          onChange={(event) => {
            setTitle(event.target.value);
          }}
        />

        <label htmlFor="author">Authors:</label>
        {authors.map((author, index) => {
          return (
            <div key={`author ${index}`} className={formStyles.arrayItem}>
              <input
                type="text"
                name="author"
                value={author}
                onChange={(event) => changeAuthor(index, event.target.value)}
                className={formStyles.formItem}
              />
              <button
                onClick={() => removeAuthor(index)}
                className={formStyles.buttonItem}
                style={{ marginLeft: "3rem" }}
                type="button"
              >
                -
              </button>
            </div>
          );
        })}
        <button
        onClick={() => addAuthor()}
        className={formStyles.buttonItem}
        style={{ marginLeft: "auto" }}
        type="button"
      >
        +
      </button>

      <label htmlFor="category">Category:</label>
      <select
        className={formStyles.formItem}
        name="category"
        value={category}
        onChange={(event) => setCategory(event.target.value)}
      >
        <option value = "">Select a category</option>
        <option value = "Cat 1">Cat 1</option>
        <option value = "Cat 2">Cat 2</option>
        <option value = "Cat 3">Cat 3</option>
        <option value = "Cat 4">Cat 4</option>
        </select>
        
      <label htmlFor="source">Source:</label>
      <input
        className={formStyles.formItem}
        type="text"
        name="source"
        id="source"
        value={source}
        onChange={(event) => {
          setSource(event.target.value);
        }}
      />

      <label htmlFor="pubYear">Publication Year:</label>
      <input
        className={formStyles.formItem}
        type="number"
        name="pubYear"
        id="pubYear"
        value={pubYear}
        onChange={(event) => {
          const val = event.target.value;
          setPubYear(parseInt(val));
        }}
      />

      <label htmlFor="doi">DOI:</label>
      <input
        className={formStyles.formItem}
        type="text"
        name="doi"
        id="doi"
        value={doi}
        onChange={(event) => {
          setDoi(event.target.value);
        }}
      />

      <label htmlFor="claim">Claim:</label>
      <input
        className={formStyles.formItem}
        type="text"
        name="claim"
        id="claim"
        value={claim}
        onChange={(event) => {
          setClaim(event.target.value);
        }}
      />

      <label htmlFor="evidence">Evidence:</label>
      <input
        className={formStyles.formItem}
        type="text"
        name="evidence"
        id="evidence"
        value={evidence}
        onChange={(event) => {
          setEvidence(event.target.value);
        }}
      
      />

      <label htmlFor="Summary">Summary:</label>
      <textarea 
        className={formStyles.formItem}
        name="summary"
        id="summary"
        value={summary}

        rows={5}
        cols={50}
        placeholder="Enter your summary here..."

        onChange={(event) => {
          setSummary(event.target.value);
        }}
      />

      <button className={formStyles.formItem} type="submit">
        Submit
      </button>
      </form>
    </div>
  );
};

export default NewDiscussion;