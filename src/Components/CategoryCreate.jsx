import { useContext, useState } from 'react';
import { Global } from './GlobalContext';

const CreateCategory = () => {

    const { createCategory, setRoute } = useContext(Global);
    const [title, setTitle] = useState('');
    const [type, setType] = useState('');

    const createC = (e) => {
        e.preventDefault();
        createCategory({
            title: title,
            type: parseInt(type),
        });
        setRoute('categories-list-page');
    };

    return (
        <div className="container">
            <div className="row justify-content-center">
                <div className="col-10 col-md-9 col-lg-8 col-xl-7 col-xxl-6">
                    <div className="card mt-4">
                        <div className="card-header text-center">Create a category</div>
                        <div className="card-body">
                            <label className="form-label">Category title</label>
                            <input
                                className="form-control"
                                type="text"
                                value={title}
                                onChange={(e) => setTitle(e.target.value)}
                            />
                            <label htmlFor="category" className="form-label">Choose type</label>
                            <input
                                id="category"
                                className="form-control"
                                type="number"
                                min="0"
                                value={type}
                                onChange={(e) => setType(e.target.value)}
                            />
                            <div className="flex flex-row items-center justify-between">
                                <button
                                    className="btn btn-outline-primary mt-2"
                                    onClick={createC}
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

export default CreateCategory;