import { useContext } from 'react';
import { Global } from './GlobalContext';

const Totals = () => {
    const { list, categoriesList } = useContext(Global);
    return (
        <div className="container">
            <div className="row justify-content-center">
                <div className="col-sm-6 col-md-5 col-lg-4 col-xxl-3">
                    <div className="card shadow mb-4">
                        <p className="card-header">Concerts Totals</p>
                        <div className="card-body">
                            <ul className="list-group list-group-flush">
                                <li className="list-group-item"><span className="text-muted">Concerts Total: </span>
                                    {list === null ? null : list.length}
                                </li>
                                <li className="list-group-item"><span className="text-muted">Active Concerts: </span>
                                    {list?.filter((acc) => acc.active > 0).length ?? 0}
                                </li>
                                <li className="list-group-item"><span className="text-muted">Pending Concerts: </span>
                                    {list?.filter((acc) => acc.active < 0).length ?? 0}
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
                <div className="col-sm-6 col-md-5 col-lg-4 col-xxl-3">
                    <div className="card shadow mb-4">
                        <p className="card-header">Categories Totals</p>
                        <div className="card-body">
                            <ul className="list-group list-group-flush">
                                {/* <li className="list-group-item"><span className="text-muted">Categories Total: </span>
                                    {categoriesList?.filter((acc) => acc.cont_type !== null).length ?? 0}
                                </li>
                                <li className="list-group-item"><span className="text-muted">Dance Category: </span>
                                    {categoriesList?.filter((acc) => acc.cont_type === 1).length ?? 0}
                                </li>
                                <li className="list-group-item"><span className="text-muted">Singing Category: </span>
                                    {categoriesList?.filter((acc) => acc.cont_type === 2).length ?? 0}
                                </li>
                                <li className="list-group-item"><span className="text-muted">Theater Category: </span>
                                    {categoriesList?.filter((acc) => acc.cont_type === 3).length ?? 0}
                                </li>
                                    <li className="list-group-item"><span className="text-muted">Sports Category: </span>
                                    {categoriesList?.filter((acc) => acc.cont_type === 4).length ?? 0}
                                </li>
                                <li className="list-group-item"><span className="text-muted">Concerts per Place: </span>
                                    {(categoriesList === null ? null : categoriesList.length / categoriesList?.filter((acc) => acc.cont_type !== null).length) ?? 0}
                                </li> */}
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Totals;