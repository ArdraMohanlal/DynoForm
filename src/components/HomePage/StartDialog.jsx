import React from "react";
import { Link } from "react-router-dom";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";

export default function StartDialog({ open, onClose }) {
  return (
    <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
      <DialogTitle className="text-center text-2xl font-bold text-gray-800 mt-8">
        How would you like to begin?
      </DialogTitle>

      <DialogContent>
        <DialogContentText className="text-center text-gray-600 mb-4">
          Choose your preferred way to create your dynamic form.
        </DialogContentText>

        <div className="flex flex-col sm:flex-row gap-6 justify-center pb-6 mt-8">
          <Link
            to="/templates"
            className="border border-purple-400 text-purple-700 hover:bg-purple-50/50 
            font-semibold py-4 px-10 rounded-xl text-lg transition-all hover:shadow-xl hover:border-purple-800 text-center"
          >
            Start with a Template
          </Link>

          <Link
            to="/builder"
            className="bg-gradient-to-r from-purple-600 to-fuchsia-500 text-white
            hover:from-purple-700 hover:to-fuchsia-600 
            shadow-[0_4px_20px_rgba(168,85,247,0.45)]
            transform hover:scale-102 transition-all font-semibold 
            py-4 px-10 rounded-xl text-lg text-center"
          >
            Build from Scratch
          </Link>
        </div>
      </DialogContent>

      <DialogActions>
        <Button onClick={onClose}>Cancel</Button>
      </DialogActions>
    </Dialog>
  );
}
