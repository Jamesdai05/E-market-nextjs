import { Spinner } from "@/components/ui/spinner";
import { Button } from "@/components/ui/button";

const Loader =()=>{
  return (
      <div className="flex justify-center items-center">
          <Button disabled size="lg">
              <Spinner data-icon="inline-start" />
              Loading...
          </Button>
      </div>
  );
};

export default Loader;