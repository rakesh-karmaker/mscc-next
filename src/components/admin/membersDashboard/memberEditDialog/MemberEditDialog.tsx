"use client";

import React, { useActionState, useState, useTransition } from "react";
import "./MemberEditDialog.css";
import { useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { TextField } from "@mui/material";
import { RequestedMembers } from "@/types/getServiceTypes";
import removeNewTagFromMember from "@/actions/removeNewTagFromMember";
import { HiMiniXMark } from "react-icons/hi2";
import deleteMemberAction from "@/actions/deleteMemberAction";
import editMemberPositionAndRoleAction from "@/actions/editMemberPositionAndRoleAction";
import { InputLabel, MenuItem, Select } from "@mui/material";

const MemberEditDialog = ({ member }: { member: RequestedMembers }) => {
  const queryClient = useQueryClient();
  const [isOpen, setIsOpen] = useState(false);

  const startTransition = useTransition()[1];
  const handleChangeNewClick = () => {
    startTransition(async () => {
      await removeNewTagFromMember(member?.slug);
      queryClient.invalidateQueries({ queryKey: ["members"] });
    });
  };

  return (
    <div className="member-edit-btn-container" style={{ cursor: "initial" }}>
      {isOpen === true && (
        <div
          className={`dialog-container ${isOpen ? "open" : ""}`}
          onClick={(e) => e.stopPropagation()}
        >
          <dialog className="edit-dialog" open>
            <div>
              <div className="edit-dialog-title">
                <h2>Edit Member</h2>
                <HiMiniXMark
                  className="close"
                  onClick={(e: React.MouseEvent<SVGSVGElement>) => {
                    e.stopPropagation();
                    setIsOpen(false);
                  }}
                />
              </div>
            </div>
            <EditForm member={member} setIsOpen={setIsOpen} />
          </dialog>
        </div>
      )}

      <button
        type="button"
        className={`primary-button ${member?.new ? "new" : ""}`}
        onClick={(e) => {
          e.stopPropagation();
          setIsOpen(true);
          if (member?.new) {
            handleChangeNewClick();
          }
        }}
      >
        Edit Member
      </button>
    </div>
  );
};

const EditForm = ({
  member,
  setIsOpen,
}: {
  member: RequestedMembers;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
  const queryClient = useQueryClient();

  const deleteMemberFunc = async (slug: string) => {
    const res = await deleteMemberAction(slug);
    if (res.success) {
      queryClient.invalidateQueries({ queryKey: ["members"] });
      toast.success("Member deleted successfully!");
      setIsOpen(false);
    } else {
      toast.error("Failed to delete member");
    }
  };

  const initialState = {
    position: member?.position,
    role: member?.role,
    slug: member?.slug,
    errors: {
      position: null,
      role: null,
    },
  };

  const [state, action] = useActionState(
    editMemberPositionAndRoleAction as unknown as (
      state: typeof initialState,
      formData: FormData
    ) => Promise<typeof initialState>,
    initialState
  );

  return (
    <form className="member-edit-form" action={action}>
      <TextField
        id="position"
        label="Position"
        variant="outlined"
        value={state.position}
        defaultValue={state.position}
        error={!!state?.errors?.position}
        helperText={state?.errors?.position}
      />

      <div>
        <InputLabel id={"role"}>Role</InputLabel>
        <Select
          id="role"
          label="Role"
          value={state.role}
          defaultValue={state.role}
          error={!!state?.errors?.role}
        >
          <MenuItem value="member">Member</MenuItem>
          <MenuItem value="admin">Admin</MenuItem>
        </Select>
        {state?.errors?.role && (
          <p style={{ color: "red" }}>{state?.errors?.role}</p>
        )}
      </div>

      <div className="edit-dialog-actions">
        <button
          type="submit"
          className="primary-button"
          onClick={(e) => {
            e.stopPropagation();
          }}
        >
          Save
        </button>

        <button
          type="button"
          className="danger-button primary-button"
          onClick={(e) => {
            e.stopPropagation();
            deleteMemberFunc(member.slug);
          }}
        >
          Delete
        </button>
      </div>
    </form>
  );
};

export default MemberEditDialog;
