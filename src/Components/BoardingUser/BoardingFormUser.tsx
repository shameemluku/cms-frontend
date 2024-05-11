import React, { useEffect, useState } from "react";
import "../../styles/boarding.css";
import { useRecoilState } from "recoil";
import { configLoadingState, configState } from "../../recoil/atom/form";
import GenerateField from "../Boarding/GenerateField";
import AddIcon from "@mui/icons-material/Add";
import { Field, FormData } from "../../types/form";
import { FormState, userDetailState } from "../../recoil/atom/user";

const RegistrationForm: React.FC = () => {
  const [active, setActive] = useState(0);
  const [config, setConfig] = useRecoilState<FormData[]>(configState);
  const [loadingConfig] = useRecoilState<Boolean>(configLoadingState);
  const [userDetails, setUserDetails] =
    useRecoilState<FormState>(userDetailState);
  const [fieldErrors, setErrors] = useState<any>({});

  const nextStep = () => {
    if (validateForm()) {
      if (active < config?.length - 1) {
        setActive(active + 1);
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
          const { required, name } = field;
          if (required) {
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
        const { required, name } = field;
        if (required) {
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
    console.log(errors);

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

  useEffect(() => {
    console.log(userDetails);
  }, [userDetails]);

  return (
    <div className="board-form-container">
      <div className="card">
        <div className="form">
          <div className="left-side">
            <div className="left-heading">
              <h3>Shameem</h3>
            </div>
            <div className="steps-content">
              <h3>
                Step <span className="step-number">{active + 1}</span>
              </h3>
              <p
                className={`step-number-content ${true ? "active" : "d-none"}`}
              >
                Enter your personal information to get closer to companies.
              </p>
              {/* Repeat for other steps */}
            </div>
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
            {/* Content for each form step */}
            <div className={`main ${true ? "active" : ""}`}>
              <div className="text">
                <h2>Your {config[active]?.title}</h2>
                <p>Enter your {config[active]?.title} for verification.</p>
              </div>
              <div className="main-wrapper">
                {[...Array(config[active]?.more_count || 1)]?.map((_, i) => {
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

                        return (
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
                                ? (userDetails?.id_proof || "")
                                : null
                            }
                            fileType={config[active]?.file_types || null}
                          />
                        );
                      })}
                    </div>
                  );
                })}

                {config[active]?.loop &&
                  config[active]?.more_count < (config[active]?.limit || 0) && (
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
                                    name_insititution: "",
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
                <button className="back_button" onClick={prevStep}>
                  Back
                </button>
                <button className="next_button" onClick={nextStep}>
                  Next Step
                </button>
              </div>
            </div>
            {/* Repeat for other form steps */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default RegistrationForm;
