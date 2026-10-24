import { Search } from "lucide-react";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { cn } from "@/lib/utils";
import Form from "next/form";

const searchButtonClass =
    "shrink-0 bg-nav-accent text-nav-foreground hover:bg-nav-foreground hover:text-nav";

const SearchComponent = ({ className }: { className?: string }) => {
    return (
        <Form
            action="/products"
            className={cn("flex w-full items-center gap-2", className)}
        >
            <Input
                className="bg-nav-foreground text-foreground placeholder:text-muted-foreground"
                type="search"
                placeholder="Enter the search"
          aria-label="search products"
          name="query"
            />
            <Button
                className={searchButtonClass}
                type="submit"
                aria-label="Search"
                size="icon"
            >
                <Search className="size-4" />
            </Button>
        </Form>
    );
};
export default SearchComponent;
