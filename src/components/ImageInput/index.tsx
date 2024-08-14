import { ForwardedRef, forwardRef } from "react";
import style from "./index.module.scss";
import { observer } from "mobx-react-lite";
import { createImageList } from "../../engines/transform";
import { Mimes } from "../../mimes";

export const ImageInput = observer(
  forwardRef((_, ref: ForwardedRef<HTMLInputElement>) => {
    return (
      <input
        ref={ref}
        className={style.file}
        type="file"
        multiple
        accept={Object.keys(Mimes)
          .map((item) => "." + item)
          .join(",")}
        onChange={async (event) => {
          const files = event.target.files;
          if (!files?.length) {
            event.target.value = "";
            return;
          }
          const list = Array.from(files).filter((file) => !!file);
          await createImageList(list);
          event.target.value = "";
        }}
      />
    );
  }),
);
