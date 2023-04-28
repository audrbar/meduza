import { useContext, useState } from 'react';
import { Global } from './GlobalContext';

const CategoryEdit = ({ id }) => {
    const { categoriesList, setRoute } = useContext(Global);
    const catItem = categoriesList?.data?.find(cat => (cat.id) === id);

    const [title, setTitle] = useState(catItem.title);
    const [type, setType] = useState(catItem.type);

    const editCat = (e) => {
        e.preventDefault();
        editCat({
            id: id,
            title: title,
            type: parseInt(type),
        });
        setRoute('categories-list-page');
    };

    return (
        <div className="container">
            <div className="row justify-content-center">
                <div className="col-10 col-md-7 col-lg-6 col-xl-5 col-xxl-5">
                    <div className="card mt-4">
                        <div className="card-header text-center">Edit a category</div>
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
                                    onClick={editCat}
                                >
                                    SUBMIT
                                </button>
                            </div>
                        </div>
                    </div>
                    <p className="nav-item text-center cursor-pointer mt-4" role="button" onClick={_ => setRoute('categorys-list-page')}>
                        Back to categorys Page
                    </p>
                </div>
            </div>
        </div>
    );
};

export default CategoryEdit;