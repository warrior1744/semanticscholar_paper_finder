import React from "react";

function BucketItem({ paper, index, handleDelete }) {
  return (
    <div key={paper._id}>
      <div className="flex flex-row">
        <div className="mb-4 mr-2 flex flex-row">
          <div>
            <div
              className="border-solid border-2
                                border-sky-500 px-2 mr-3 font-bold rounded-full"
            >
              {index + 1}
            </div>
          </div>
          <div>
            {paper.title}
            <label
              htmlFor={`content${paper._id}`}
              className="badge badge-primary modal-button m-2 cursor-pointer"
            >
              View
            </label>
            <label
              htmlFor={`deletion${paper._id}`}
              className="badge badge-warning modal-button m-2 cursor-pointer"
            >
              Delete
            </label>
          </div>
        </div>
        <input
          type="checkbox"
          id={`content${paper._id}`}
          className="modal-toggle"
        />
        <label htmlFor={`content${paper._id}`} className="modal cursor-pointer">
          <label className="modal-box relative" htmlFor="">
            <label
              htmlFor={`content${paper._id}`}
              className="btn btn-sm btn-circle absolute right-2 top-2"
            >
              X
            </label>
            <ul>
              {paper.title && (
                <li>
                  <span className="border-solid    border-2 border-sky-500 px-2 mr-3 font-bold rounded-full">
                    {index + 1}
                  </span>
                  <div>Title：{paper.title}</div>
                </li>
              )}{" "}
              _.pluck(names3, 'name').join(', ')
              {paper.authors && (
                <li>
                  Author：
                  {paper.authors.reduce(
                    (str, obj, index) =>
                      str + (index > 0 ? ", " : "") + obj.name,
                    ""
                  )}
                </li>
              )}
              {paper.journal && paper.journal.name && (
                <li key={paper.journal.name}>Journal：{paper.journal.name}</li>
              )}
              {paper.journal && paper.journal.volume && (
                <li key={paper.journal.volume}>
                  Volume：{paper.journal.volume}
                </li>
              )}
              {paper.journal && paper.journal.pages && (
                <li key={paper.journal.pages}>Page：{paper.journal.pages}</li>
              )}
              {paper.publicationDate && (
                <li>Publication：{paper.publicationDate}</li>
              )}
              {paper.search && <li>Search：{paper.search}</li>}
              {paper.abstractCHT && (
                <li>Abstract Chinese：{paper.abstractCHT}</li>
              )}
              {paper.abstract && <li>Abstract：{paper.abstract}</li>}
              {paper.url && (
                <li>
                  <a
                    href={paper.url}
                    className="m-2 badge badge-primary"
                    target="_blank"
                    rel="noreferer"
                  >
                    Go to the official page
                  </a>
                </li>
              )}
              <br />
            </ul>
          </label>
        </label>

        <input
          type="checkbox"
          id={`deletion${paper._id}`}
          className="modal-toggle"
        />
        <label
          htmlFor={`deletion${paper._id}`}
          className="modal cursor-pointer"
        >
          <label className="modal-box relative" htmlFor="">
            <h3 className="text-lg font-bold">
              Are you sure to remove No {`${index + 1}`} item?
            </h3>
            <div className="flex flex-fow justify-around">
              <div className="modal-action">
                <label
                  htmlFor={`deletion${paper._id}`}
                  className="btn"
                  onClick={() => {
                    handleDelete(paper._id);
                  }}
                >
                  Confirm
                </label>
              </div>
              <div className="modal-action">
                <label htmlFor={`deletion${paper._id}`} className="btn">
                  Cancel
                </label>
              </div>
            </div>
          </label>
        </label>
      </div>
    </div>
  );
}

export default BucketItem;
