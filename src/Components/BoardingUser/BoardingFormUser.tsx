import AddIcon from "@mui/icons-material/Add";
import React, { useEffect, useState } from "react";
import { useRecoilState } from "recoil";
import compLogo from "../../assets/compLogo.png";
import { configLoadingState, configState } from "../../recoil/atom/form";
import {
  userBoardedState,
  userDetailState,
  userState,
} from "../../recoil/atom/user";
import "../../styles/boarding.css";
import { Field, FormData } from "../../types/form";
import { IUserDetails } from "../../types/user";
import GenerateField from "../Boarding/GenerateField";
import useDetails from "../../hook/useDetails";
import doneIco from "../../assets/doneIco.svg";
import { CircularProgress, Fab } from "@mui/material";
import LogoutIcon from "@mui/icons-material/Logout";
import { toast } from "react-toastify";
import { errorFormatter } from "../../Utils/formatter";
import useAuth from "../../hook/useAuth";
import { updateUserDetails } from "../../api/user";
import CloseIcon from "@mui/icons-material/Close";

const RegistrationForm: React.FC = () => {
  const [user] = useRecoilState(userState);
  const [loading, setLoading] = useState<string | null>(null);
  const [active, setActive] = useState(0);
  const [config, setConfig] = useRecoilState<FormData[]>(configState);
  const [loadingConfig] = useRecoilState<Boolean>(configLoadingState);
  const [userBoarded, setBoarded] = useRecoilState(userBoardedState);
  const [userDetails, setUserDetails] =
    useRecoilState<IUserDetails>(userDetailState);
  const { getUserDetails, clearUserDetails } = useDetails();

  const [fieldErrors, setErrors] = useState<any>({});

  const nextStep = () => {
    if (validateForm()) {
      if (active < config?.length - 1) {
        setActive(active + 1);
      }
      if (active === 3) {
        handleSubmit();
      }
    }
  };

  const prevStep = () => {
    setActive((active) => active - 1);
  };

  const blankArr = [null, undefined, ""];

  const validateForm = () => {
    let errors: { [key: string]: any } = {};

    const current = config[active];
    const { form_id, fields, loop, more_count } = current;

    if (loop) {
      let key: string =
        form_id === "pro_3"
          ? "pro_details"
          : form_id === "edu_2"
          ? "education_details"
          : "";

      [...Array(more_count)].forEach((_, index) => {
        fields?.forEach((field: Field) => {
          const { required, name, enabled } = field;

          if (required && enabled) {
            if (blankArr.includes(userDetails?.[key]?.[index]?.[name])) {
              errors[key] = errors[key] || [];
              errors[key][index] = {
                ...(errors[key]?.[index] ? errors[key][index] : {}),
                [name]: "Required field",
              };
            }
          }
        });
      });
    } else {
      fields?.forEach((field: Field) => {
        const { required, name, enabled } = field;
        if (required && enabled) {
          if (blankArr.includes(userDetails?.[name])) {
            errors = {
              ...errors,
              [name]: "Required field",
            };
          }
        }
      });
    }
    setErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleValueChange = (
    fieldName: string,
    newValue: any,
    isArray: boolean,
    arrayName: string,
    i: number
  ) => {
    if (!isArray) {
      setUserDetails({
        ...userDetails,
        [fieldName]: newValue,
      });
    } else {
      const array = (userDetails[arrayName] || []).map(
        (item: any, index: number) => {
          if (index === i) {
            return {
              ...item,
              [fieldName]: newValue,
            };
          }
          return item;
        }
      );

      setUserDetails({
        ...userDetails,
        [arrayName]: array,
      });
    }
  };

  const handleSubmit = async () => {
    try {
      setLoading("UPDATING");
      await updateUserDetails({
        ...userDetails,
        user_id: user?._id,
      });
      toast.success("Boarding Successfull!!");
      setBoarded(true);
    } catch (error) {
      toast.error(errorFormatter(error));
    }
    setLoading(null);
  };

  const { logoutUser } = useAuth();
  const handleLogoutClick = async () => {
    try {
      setLoading("LOGOUT");
      await logoutUser();
      setBoarded(false);
      clearUserDetails();
    } catch (error) {
      toast.error(errorFormatter(error));
    }
    setLoading(null);
  };

  useEffect(() => {
    if (user?._id) {
      getUserDetails(user?._id);
    }
  }, [user]);

  useEffect(() => {
    if (userBoarded) {
      setActive(4);
    }
  }, [userBoarded]);

  return (
    <>
      <div className="board-form-container">
        <div className="card">
          <div className="form">
            <div className="left-side">
              <div className="left-heading">
                <img src={compLogo} alt="Logo" width={"150"} />
              </div>
              {!userBoarded && (
                <div className="steps-content">
                  <h3>
                    Step <span className="step-number">{active + 1}</span>
                  </h3>
                  <p
                    className={`step-number-content ${
                      true ? "active" : "d-none"
                    }`}
                  >
                    In this step provide your {config[active]?.title} for
                    verification.
                  </p>
                </div>
              )}
              <ul className="progress-bar">
                {config?.map((item: FormData, index) => {
                  return (
                    <li className={index <= active ? "active" : ""}>
                      {item?.title}
                    </li>
                  );
                })}
              </ul>
            </div>
            <div className="right-side">
              {!userBoarded && (
                <div className={`main ${true ? "active" : ""}`}>
                  <div className="text">
                    <h2>Your {config[active]?.title}</h2>
                    <p>Enter your {config[active]?.title} for verification.</p>
                  </div>
                  <div className="main-wrapper">
                    {[...Array(config[active]?.more_count || 1)]?.map(
                      (_, i) => {
                        return (
                          <div className="flex flex-col gap-[10px] my-5">
                            {config[active]?.fields?.map((field) => {
                              let key =
                                config[active]?.form_id === "pro_3"
                                  ? "pro_details"
                                  : config[active]?.form_id === "edu_2"
                                  ? "education_details"
                                  : "";
                              let error = config[active]?.loop
                                ? fieldErrors?.[key]?.[i]?.[field?.name]
                                : fieldErrors?.[field?.name];

                              let value = config[active]?.loop
                                ? userDetails?.[key]?.[i]?.[field?.name]
                                : userDetails?.[field?.name];

                              return field?.enabled ? (
                                <GenerateField
                                  field={field}
                                  onChange={(e) => {
                                    handleValueChange(
                                      field?.name,
                                      e.target.value,
                                      config[active]?.loop,
                                      key,
                                      i
                                    );
                                  }}
                                  value={value || ""}
                                  isError={error}
                                  errorTxt={error}
                                  extraLabel={
                                    field?.name === "id_proof_upload"
                                      ? userDetails?.id_proof || ""
                                      : null
                                  }
                                  fileType={config[active]?.file_types || null}
                                />
                              ) : null;
                            })}
                          </div>
                        );
                      }
                    )}

                    {config[active]?.loop &&
                      config[active]?.more_count <
                        (config[active]?.limit || 0) && (
                        <div className="flex justify-end">
                          <button
                            className="text-[15px] text-[gray]"
                            onClick={() => {
                              let newState = Array.from(config || []);
                              newState[active] = {
                                ...newState[active],
                                more_count: newState[active].more_count + 1,
                              };
                              setConfig(newState);
                              let key =
                                config[active]?.form_id === "pro_3"
                                  ? "pro_details"
                                  : config[active]?.form_id === "edu_2"
                                  ? "education_details"
                                  : "";
                              setUserDetails({
                                ...userDetails,
                                [key]: [
                                  ...userDetails[key],
                                  key === "pro_details"
                                    ? { company_name: "", designation: "" }
                                    : {
                                        education_type: "",
                                        name_institution: "",
                                        edu_grade: "",
                                      },
                                ],
                              });
                            }}
                          >
                            <AddIcon /> Add more
                          </button>
                        </div>
                      )}
                  </div>
                  <div className="buttons button_space">
                    {loading === "UPDATING" ? (
                      <>
                        <div className="flex items-center">
                          <CircularProgress size={20} sx={{ mr: 1 }} />{" "}
                          Submitting data
                        </div>
                        <CloseIcon
                          className="cursor-pointer"
                          onClick={() => setLoading(null)}
                        />
                      </>
                    ) : (
                      <>
                        <button
                          className="back_button"
                          onClick={prevStep}
                          disabled={active === 0}
                          style={{
                            opacity: active === 0 ? 0.2 : 1,
                          }}
                        >
                          Back
                        </button>
                        <button className="next_button" onClick={nextStep}>
                          Next Step
                        </button>
                      </>
                    )}
                  </div>
                </div>
              )}
              {userBoarded && (
                <div className="h-[100%] flex flex-col justify-center items-center">
                  <img src={doneIco} width={200} />
                  <p className="text-[30px]">Congratulations!!</p>
                  <p className="text-[15px] text-[gray] px-[60px] text-center mt-[10px]">
                    You have completed the onboarding process.
                    <br /> Please wait till we verify your data
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      <div className="flex gap-[10px] fixed left-[20px] bottom-[20px]">
        <Fab
          aria-label="add"
          onClick={() => {
            handleLogoutClick();
          }}
          disabled={loading === "LOGOUT"}
        >
          {loading === "LOGOUT" ? (
            <CircularProgress size={20} />
          ) : (
            <LogoutIcon />
          )}
        </Fab>
      </div>
    </>
  );
};

export default RegistrationForm;
