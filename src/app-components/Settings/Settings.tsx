import { useAppSelector } from "../../app-context/store";

export const Settings = () => {

    const navigationSliceManager = useAppSelector((state) => state.navigationReducer);

    return(
        <div className={`container ${navigationSliceManager.open ? "open" : "close"}`}>
            <div className="content">
                <h1>Settings</h1>
            </div>
        </div>
    )
}