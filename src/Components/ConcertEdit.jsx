import { useContext, useState } from 'react';
import { Global } from './GlobalContext';

const ConcertEdit = ({ id }) => {
    const { list, editConcert, setRoute } = useContext(Global);
    const concertItem = list.find(concert => (concert.id) === id);
    const [title, setTitle] = useState(concertItem.title);
    const [category, setCategory] = useState(concertItem.category);
    const [place, setPlace] = useState(concertItem.place);
    const [active, setActive] = useState(concertItem.active);
    const [time, setTime] = useState(concertItem.time);

    const edit = (e) => {
        e.preventDefault();
        editConcert({
            id: id,
            title,
            category: parseInt(category),
            active: parseInt(active),
            place,
            time,
        });
        setRoute('concerts-list-page');
    };

    return (
        <div className="container">
            <div className="row justify-content-center">
                <div className="col-10 col-md-7 col-lg-6 col-xl-5 col-xxl-5">
                    <div className="card mt-4">
                        <div className="card-header text-center">Edit a concert</div>
                        <div className="card-body">
                            <label htmlFor="title" className="form-label">Concert title</label>
                            <input
                                id="title"
                                className="form-control"
                                type="text"
                                value={title}
                                onChange={(e) => setTitle(e.target.value)}
                            />
                            <label htmlFor="place" className="form-label">Concert place</label>
                            <input
                                id="place"
                                className="form-control"
                                type="text"
                                value={place}
                                onChange={(e) => setPlace(e.target.value)}
                            />
                            <label htmlFor="category" className="form-label">Concert category</label>
                            <input
                                id="category"
                                className="form-control"
                                type="number"
                                min="0"
                                max="3"
                                value={category}
                                onChange={(e) => setCategory(e.target.value)}
                            />
                            <label htmlFor="active" className="form-label">Concert active</label>
                            <input
                                id="active"
                                className="form-control"
                                type="number"
                                name="active"
                                min="0"
                                max="1"
                                value={active}
                                onChange={e => setActive(e.target.value)}
                            />
                            {/* <label htmlFor="time" className="form-label">Concert date</label>
                            <input
                                id="time"
                                className="form-control"
                                type="date"
                                value={time}
                                onChange={(e) => setTime(e.target.value)}
                            /> */}
                            <div className="flex flex-row items-center justify-between">
                                <button
                                    className="btn btn-outline-primary mt-2"
                                    onClick={edit}
                                >
                                    SUBMIT
                                </button>
                            </div>
                        </div>
                    </div>
                    <p className="nav-item text-center cursor-pointer mt-4" role="button" onClick={_ => setRoute('concerts-list-page')}>
                        Back to Concerts Page
                    </p>
                </div>
            </div>
        </div>
    );
};

export default ConcertEdit;