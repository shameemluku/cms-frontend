import { useRecoilState } from "recoil";
import { configLoadingState, configState } from "../recoil/atom/form";
import { getConfigrations } from "../api/form";

export default function useConfig() {
  const [, setConfig] = useRecoilState(configState);
  const [, setLoading] = useRecoilState(configLoadingState);

  const generateFlow = async () => {
    try {
      setLoading(true);
      const { data } = await getConfigrations();
      console.log(data);
      const { form_flow, form_fields } = data?.data;

      setConfig(
        form_flow?.steps?.map((form: Record<any, any>) => {
          let found = form_fields?.find(
            (fields: Record<any, any>) => fields?.parent_id === form?.form_id
          );
          return {
            ...form,
            fields: found?.fields || [],
            more_count: 1,
            ...(found?.other_config || {}),
          };
        })
      );
    } catch (error) {}
    setLoading(false);
  };

  return {
    generateFlow,
  };
}
