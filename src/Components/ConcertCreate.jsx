import { useContext, useState } from 'react';
import { Global } from './GlobalContext';

const CreateConcert = () => {
    const { createConcert, setRoute } = useContext(Global);
    const [title, setTitle] = useState('');
    const [category, setCategory] = useState(0);
    const [time, setTime] = useState(0);
    const [place, setPlace] = useState(0);
    const [file, setFile] = useState();

    const create = (e) => {
        e.preventDefault();
        createConcert({
            title,
            category: parseInt(category),
            place,
            time: parseInt(time),
            file
        });
        setRoute('concerts-list-page');
    };

    const fileReader = file => {
        return new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.readAsDataURL(file);
            reader.onload = _ => resolve(reader.result);
            reader.onerror = error => reject(error);
        });
    }

    const readFile = e => {
        fileReader(e.target.files[0])
            .then(f => setFile(f))
            .catch(_ => {
                //error
            })
    }

    return (
        <div className="container">
            <div className="row justify-content-center">
                <div className="col-10 col-md-9 col-lg-8 col-xl-7 col-xxl-6">
                    <div className="card mt-4">
                        <div className="card-header text-center">Create a concert</div>
                        <div className="card-body">
                            <label className="form-label">Concert title</label>
                            <input
                                className="form-control"
                                type="text"
                                value={title}
                                onChange={(e) => setTitle(e.target.value)}
                            />
                            <label className="form-label">Concert place</label>
                            <input
                                className="form-control"
                                type="place"
                                value={place}
                                onChange={(e) => setPlace(e.target.value)}
                            />
                            <label className="form-label">Concert category</label>
                            <input
                                className="form-control"
                                type="number"
                                name="category"
                                min="0"
                                value={category}
                                onChange={e => setCategory(e.target.value)}
                            />
                            {/* <label className="form-label" htmlFor="date">Time</label>
                            <input
                                id="date"
                                className="form-control"
                                type="date"
                                name="date"
                                value={time}
                                onChange={e => setTime(e.target.value)}
                            /> */}
                            <label htmlFor="formFileSm" className="form-label mt-1">concert image</label>
                            <input
                                className="form-control form-control-sm"
                                id="formFileSm"
                                type="file"
                                onChange={readFile}
                            />
                            {/* <p className="form-label mt-1">Choose your category:
                                <select
                                    className="form-select my-1"
                                    aria-label="Default select example"
                                    name="category list"
                                    value={categoryId}
                                    onChange={(e) => { setCategoryId(e.target.value) }}
                                >
                                    {
                                        catList?.data?.length ?
                                            catList?.data?.map((cont) => (
                                                <option
                                                    key={cat.cat_id}
                                                    value={cat.cat_id}
                                                >
                                                    {cat.cat_title}
                                                </option>
                                            )
                                            ) : null

                                    }
                                </select>
                            </p> */}
                            <div className="flex flex-row items-center justify-between">
                                <button
                                    className="btn btn-outline-primary mt-2"
                                    onClick={create}
                                >
                                    SUBMIT
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CreateConcert;