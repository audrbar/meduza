import { useContext } from 'react';
import { Global } from './GlobalContext';

const IMG = 'http://localhost:3003/';

const ConcertsList = () => {
    const { list, deleteConcert, setRoute } = useContext(Global);

    return (
        <div className="row justify-content-center">
            <div className="col-11 col-md-10 col-lg-9 col-xl-8 col-xxl-7">
                <button
                    type="button"
                    className="btn btn-outline-secondary mt-2"
                    onClick={_ => setRoute('create-concert-page')}
                >
                    Create New concert
                </button>
                <div className="card shadow mt-3">
                    <p className="card-header text-center">Active Concerts List</p>
                    {list?.length ? (
                        list?.map((concert) => (
                            <ul key={concert.id} className="list-group-item">
                                <li className="list-group-item mx-2 d-flex border-bottom justify-content-between p-1">
                                    <div className="d-flex align-items-start w-25 justify-content-center">
                                        {
                                            concert.photo
                                                ? <img className="list-image w-50" alt="" src={IMG + concert.photo} />
                                                : <img className="list-image w-50" alt="" src={IMG + 'picture.png'} />
                                        }
                                    </div>
                                    <div className="d-flex flex-column align-items-start justify-content-center">
                                        <h4>{concert.title}</h4>
                                        <p>{concert.category}</p>
                                        <p>{concert.place}</p>
                                        <p>{concert.time}</p>
                                    </div>
                                    <div className="d-flex flex-column align-items-end justify-content-center">
                                        <button type="button" className="btn btn-outline-primary m-1" onClick={() => setRoute({ path: 'concert-edit-page', data: { id: concert.id } })}>EDIT</button>
                                        <button type="button" className="btn btn-outline-danger m-1" onClick={() => deleteConcert(concert.id)}>DELETE</button>
                                    </div>
                                    <div className="d-flex flex-column align-items-end justify-content-center">
                                        {/* <p>{concert.container_id ? (<span style={{ color: 'green' }}>The concert is loaded</span>) : (
                                            <span style={{ color: 'crimson' }}>The concert is not loaded</span>
                                        )}</p> */}
                                        {/* {
                                            concert.container_id ?
                                                (
                                                    <button type="button" className="btn btn-outline-danger m-1" onClick={() => setRoute({ path: 'concert-load-page', data: { id: concert.id } })}>CHANGE</button>
                                                ) : (
                                                    <button type="button" className="btn btn-outline-primary m-1" onClick={() => setRoute({ path: 'concert-load-page', data: { id: concert.id } })}>LOAD</button>
                                                )
                                        } */}
                                    </div>
                                </li>
                            </ul>
                        ))
                    ) : (
                        <h2>Nothing to show!</h2>
                    )}
                </div>
            </div>
        </div>
    );
};

export default ConcertsList;