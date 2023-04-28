import { useContext } from 'react';
import { Global } from './GlobalContext';

const CargosList = () => {
    const { categoriesList, deleteCategory, setRoute } = useContext(Global);

    return (
        <div className="container">
            <div className="row">
                <button
                    type="button"
                    className="btn btn-outline-secondary w-25 mt-2 mx-2"
                    onClick={_ => setRoute('create-category-page')}
                >
                    New category
                </button>
                <h5 className="text-center py-3">Available categories List</h5>
                {categoriesList?.data.length ? (
                    categoriesList?.data.map((category) => (
                        <div key={category.id} className="col-sm-6 col-lg-4 col-xxl-3">
                            <div className="card shadow mb-4">
                                <div className="card-header">
                                    Category Features
                                </div>
                                <div className="card-body">
                                    <ul className="list-group list-group-flush">
                                        <h4><span className="text-muted">name: </span>{category.title}</h4>
                                        <p><span className="text-muted">id: </span>{category.id}</p>
                                    </ul>
                                    <div>
                                        <button type="button" className="btn btn-outline-danger m-1" onClick={() => deleteCategory(category.id)}>DELETE</button>
                                        <button type="button" className="btn btn-outline-primary m-1" onClick={() => setRoute({ path: 'category-edit-page', data: { id: category.id } })}>EDIT</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))
                ) : (
                    <h2>Nothing to show!</h2>
                )}
            </div>
        </div>
    );
};

export default CargosList;