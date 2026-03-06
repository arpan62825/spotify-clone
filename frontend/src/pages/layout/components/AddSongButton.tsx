import { useState } from "react";
import { useDropzone } from "react-dropzone";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Plus } from "lucide-react";
import axiosInstance from "@/lib/axios";
import toast, { Toaster } from "react-hot-toast";
const notify = () => toast("👍 Song uploaded to cloud");

const AddSongButton = () => {
  const [file, setFile] = useState<File | null>(null);
  const [metadata, setMetadata] = useState<any>(null);
  const [loading, setLoading] = useState(false);

  // format seconds -> m:ss
  const formatDuration = (seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}:${remainingSeconds.toString().padStart(2, "0")}`;
  };

  const onDrop = async (acceptedFiles: File[]) => {
    const selectedFile = acceptedFiles[0];
    if (!selectedFile) return;

    setFile(selectedFile);
    setLoading(true);

    const formData = new FormData();
    formData.append("audioFile", selectedFile);

    try {
      const res = await axiosInstance.post("/admin/songs/extract", formData);
      setMetadata(res.data); // backend returns extracted metadata
    } catch (error) {
      console.error("Metadata extraction failed:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!file || !metadata) return;

    setLoading(true);

    const formData = new FormData();
    formData.append("audioFile", file);

    try {
      console.log(formData);
      const res = await axiosInstance.post("/admin/songs", formData);
      console.log(res.data);
      setFile(null);
      setMetadata(null);
    } catch (error) {
      console.error("Final upload failed:", error);
    } finally {
      setLoading(false);
      notify();
    }
  };

  const { getRootProps, getInputProps } = useDropzone({
    accept: { "audio/*": [] },
    multiple: false,
    onDrop,
  });

  return (
    <>
      <Dialog>
        <form onSubmit={handleSubmit}>
          <DialogTrigger asChild>
            <Button className="flex items-center gap-2 bg-emerald-500 hover:bg-emerald-600">
              <Plus className="h-4 w-4" />
              Add Song
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-sm">
            <DialogHeader>
              <DialogTitle>Add Song</DialogTitle>
              <DialogDescription>
                Drop an audio file look at the content. Confirm and upload the
                song.
              </DialogDescription>
            </DialogHeader>

            <div
              {...getRootProps()}
              className="border-dashed border p-6 border-zinc-600 rounded-xl text-center cursor-pointer"
            >
              <input {...getInputProps()} />
              Drag & drop audio file here or Click
            </div>

            {loading && <p className="text-sm mt-2">Processing...</p>}

            {metadata && (
              <div className="flex justify-around">
                <div className="size-28 border-zinc-400 border rounded-md">
                  <img
                    className="size-full object-cover object-center overflow-hidden"
                    src={`data:${metadata.imageUrl.format};base64,${metadata.imageUrl.data}`}
                    alt={metadata.title}
                  />
                </div>
                <div className="flex flex-col justify-between">
                  <p>
                    <strong>Title:</strong> {metadata.title || "Unknown"}
                  </p>
                  <p>
                    <strong>Artist:</strong> {metadata.artist || "Unknown"}
                  </p>
                  <p>
                    <strong>Album:</strong> {metadata.album || "Unknown"}
                  </p>
                  <p>
                    <strong>Duration:</strong>{" "}
                    {formatDuration(metadata.duration) || "Unknown"}
                  </p>
                </div>
              </div>
            )}

            <DialogFooter>
              <DialogClose asChild>
                <Button variant="outline">Cancel</Button>
              </DialogClose>
              <Button
                onClick={handleSubmit}
                type="submit"
                disabled={!metadata || loading}
              >
                Upload Song
              </Button>
            </DialogFooter>
          </DialogContent>
        </form>
      </Dialog>
      {/* react-hot-toast */}
      <Toaster
        position="top-center"
        reverseOrder={false}
        gutter={8}
        containerClassName=""
        containerStyle={{}}
        toasterId="default"
        toastOptions={{
          // Define default options
          className: "",
          duration: 5000,
          removeDelay: 1000,
          style: {
            background: "#00bc7d",
            color: "#121314",
          },

          // Default options for specific types
          success: {
            duration: 3000,
            iconTheme: {
              primary: "green",
              secondary: "black",
            },
          },
        }}
      />
    </>
  );
};

export default AddSongButton;
