import Loader from "react-loader-spinner";

function MarkUpLoader() {
    return (
        <div className="loader">
            <Loader
                type="Puff"
                color="#00BFFF"
                height={100}
                width={100}
                timeout={3000} //3 secs
            />
        </div>
    );
  }

export default MarkUpLoader;