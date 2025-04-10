"use client";
/* eslint-disable */
import React, { useEffect, useState } from "react";
import { useForm, useFieldArray, Controller } from "react-hook-form";

import "./TimelineInputs.css";
import toast from "react-hot-toast";
import {
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  Stack,
  TextField,
} from "@mui/material";
import DateTimePicker from "../dateTimePicker/DateTimePicker";
import dayjs from "dayjs";
import { RequestedUser, TimeLineType } from "@/types/getServiceTypes";
import { editTimeline } from "@/actions/editTimelineAction";
import { useUser } from "@/context/userProvider";

const TimelineInputs = ({
  timeline,
  user,
  setIsEditing,
  setProfileData
}: {
  timeline: TimeLineType[];
  user: RequestedUser;
  setIsEditing: React.Dispatch<React.SetStateAction<boolean>>;
  setProfileData: React.Dispatch<React.SetStateAction<RequestedUser>>;
}) => {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const { setUser } = useUser();

  const {
    register,
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    defaultValues: {
      timeline: timeline
        ? timeline.map((item) => {
            return {
              title: item.title,
              date: dayjs(item.date),
              tag: item.tag || "",
              description: item.description,
              link: item.link,
            };
          })
        : [],
    },
  });

  useEffect(() => {
    if (timeline.length > 0) {
      reset({
        timeline: timeline.map((item) => {
          return {
            title: item.title,
            date: dayjs(item.date),
            tag: item.tag || "",
            description: item.description,
            link: item.link,
          };
        }),
      });
    }
  }, [reset, timeline]);

  const { fields, append, remove } = useFieldArray({
    control,
    name: "timeline",
  });
  const [timelineLength, setTimelineLength] = useState(fields.length);

  const handleAddClick = () => {
    append({
      title: "",
      date: dayjs(),
      tag: "",
      description: "",
      link: "",
    });
    setActiveIndex(fields.length);
    setTimelineLength(fields.length + 1);
  };

  const handleRemoveClick = (index: number) => {
    remove(index);
    setTimelineLength(fields.length - 1);
    setActiveIndex(null);
  };

  const onSubmit = async (data: {
    timeline: {
      title: string;
      date: string | dayjs.Dayjs;
      tag: string;
      description: string;
      link: string;
    }[];
  }) => {
    setLoading(true);

    data.timeline = data.timeline.map(
      (item: {
        title: string;
        date: string | dayjs.Dayjs;
        tag: string;
        description: string;
        link: string;
      }) => {
        const date = dayjs(item.date);
        return {
          title: item.title,
          date: date.isValid() ? date.toISOString() : "", // Check if date is valid before converting to ISO string
          tag: item.tag,
          description: item.description,
          link: item.link,
        };
      }
    );

    const response = await editTimeline(data, user.id);
    if (response?.success) {
      toast.success("Update successful!");
      if (response.data) {
        setUser && setUser(response.data);
        setProfileData(response.data);
      }
      setLoading(false); 
      setIsEditing(false);
      window.scrollTo(0, 0);
    } else {
      toast.error("Something went wrong!");
      setLoading(false); 
    }
  };

  const tags = [
    {
      value: "Certificate",
      label: "Certificate",
    },
    {
      value: "Competition",
      label: "Competition",
    },
    {
      value: "Project",
      label: "Project",
    },
  ];
  const maxTimelineLimit = 6;
  return (
    <form
      onSubmit={handleSubmit(
        (data: {
          timeline: {
            title: string;
            date: dayjs.Dayjs;
            tag: string;
            description: string;
            link: string;
          }[];
        }) => onSubmit(data)
      )}
      className="timeline-inputs-container"
      style={{ marginTop: fields.length > 0 ? "2rem" : "0" }}
    >
      <p className="timeline-header">Timeline Edit</p>
      {fields.map((field, index) => (
        <div key={field.id}>
          <div className="timeline-actions">
            <button
              type="button"
              onClick={() => setActiveIndex(index)}
              className={index === activeIndex ? "active" : ""}
            >
              {fields[index]?.title
                ? fields[index].title.length > 25
                  ? fields[index].title.slice(0, 25) + "..."
                  : fields[index].title
                : `Event ${index + 1}`}
            </button>
            {timelineLength > 1 && (
              <button
                type="button"
                onClick={() => handleRemoveClick(index)}
                className="remove"
              >
                Remove Event
              </button>
            )}
          </div>
          <div
            className={`timeline-input-fields ${
              index === activeIndex ? "active" : ""
            }`}
          >
            <div className="timeline-input-inner">
              <Stack
                direction={{ xs: "column", sm: "row" }}
                spacing={2}
                sx={{ pt: 1 }}
              >
                <TextField
                  {...register(`timeline.${index}.title`)}
                  id={`timeline.${index}.title`}
                  label="Event Title"
                  variant="outlined"
                  error={!!errors?.timeline?.[index]?.title}
                  helperText={errors?.timeline?.[index]?.title?.message}
                  fullWidth
                />
                <Controller
                  name={`timeline.${index}.date`}
                  control={control}
                  render={({ field }) => (
                    <DateTimePicker
                      {...field}
                      value={dayjs(field.value)}
                      label="Event Date"
                    />
                  )}
                />
              </Stack>

              <Stack direction={{ xs: "column", sm: "row" }} spacing={2}>
                <FormControl fullWidth error={!!errors?.timeline?.[index]?.tag}>
                  <InputLabel id={"select-label" + `timeline.${index}.tag`}>
                    Event tag
                  </InputLabel>
                  <Controller
                    name={`timeline.${index}.tag`}
                    control={control}
                    render={({ field }) => (
                      <Select
                        labelId={"select-label" + `timeline.${index}.tag`}
                        id={"select" + `timeline.${index}.tag`}
                        label="Branch"
                        fullWidth
                        {...field}
                        error={!!errors.timeline?.[index]?.tag}
                      >
                        {tags.map((item) => (
                          <MenuItem key={item.value} value={item.value}>
                            {item.label}
                          </MenuItem>
                        ))}
                      </Select>
                    )}
                  />
                  {errors?.timeline?.[index]?.tag && (
                    <p style={{ color: "red" }}>
                      {errors?.timeline?.[index]?.tag.message}
                    </p>
                  )}
                </FormControl>

                <TextField
                  {...register(`timeline.${index}.link`)}
                  id={`timeline.${index}.link`}
                  label="Event Link"
                  variant="outlined"
                  error={!!errors?.timeline?.[index]?.link}
                  helperText={errors?.timeline?.[index]?.link?.message}
                  fullWidth
                />
              </Stack>

              <TextField
                {...register(`timeline.${index}.description`)}
                id={`timeline.${index}.description`}
                label="Event Description"
                variant="outlined"
                multiline
                rows={4}
                error={!!errors?.timeline?.[index]?.description}
                helperText={errors?.timeline?.[index]?.description?.message}
                fullWidth
              />
            </div>
          </div>
        </div>
      ))}
      {timelineLength < maxTimelineLimit ? (
        <button type="button" onClick={handleAddClick} className="add">
          Add Event to Timeline
        </button>
      ) : (
        <p className="secondary-text">Maximum {maxTimelineLimit} events</p>
      )}
      <button
        type="submit"
        className="timeline-submit"
        disabled={fields.length === 0 || loading}
      >
        {loading ? "Submitting..." : "Submit Timeline"}
      </button>
    </form>
  );
};

export default TimelineInputs;
