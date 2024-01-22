import mongoose from "mongoose";

const ResultSchema = new mongoose.Schema(
  {
    regno: { type: String, required: true },
    sex: { type: String, required: true },
    dob: { type: String, required: true },
    class: { type: String, required: true },
    arm: { type: String, required: true },
    session: { type: String, required: true },
    term: { type: String, required: true },
    club: { type: String, required: true },
    open: { type: String, required: true },
    present: { type: String, required: true },
    noInClass: { type: String, required: true },
    sch_open: { type: String, required: true },
    subjects: {
      eng: {
        ca: String,
        exam: String,
        total: String,
      },
      math: {
        ca: String,
        exam: String,
        total: String,
      },
      bstit: {
        ca: String,
        exam: String,
        total: String,
      },
      bst: {
        ca: String,
        exam: String,
        total: String,
      },
      bs: {
        ca: String,
        exam: String,
        total: String,
      },
      rnvce: {
        ca: String,
        exam: String,
        total: String,
      },
      rnvse: {
        ca: String,
        exam: String,
        total: String,
      },
      rnvcrs: {
        ca: String,
        exam: String,
        total: String,
      },
      agr_sc: {
        ca: String,
        exam: String,
        total: String,
      },
      pvsagr: {
        ca: String,
        exam: String,
        total: String,
      },
      pvshe: {
        ca: String,
        exam: String,
        total: String,
      },
      food: {
        ca: String,
        exam: String,
        total: String,
      },
      bt: {
        ca: String,
        exam: String,
        total: String,
      },
      ce: {
        ca: String,
        exam: String,
        total: String,
      },
      hand: {
        ca: String,
        exam: String,
        total: String,
      },
      heaha: {
        ca: String,
        exam: String,
        total: String,
      },
      lite: {
        ca: String,
        exam: String,
        total: String,
      },
      nume: {
        ca: String,
        exam: String,
        total: String,
      },
      phon: {
        ca: String,
        exam: String,
        total: String,
      },
      bstphe: {
        ca: String,
        exam: String,
        total: String,
      },
      qr: {
        ca: String,
        exam: String,
        total: String,
      },
      rhy: {
        ca: String,
        exam: String,
        total: String,
      },
      sosha: {
        ca: String,
        exam: String,
        total: String,
      },
      vr: {
        ca: String,
        exam: String,
        total: String,
      },
      cca: {
        ca: String,
        exam: String,
        total: String,
      },
      comp: {
        ca: String,
        exam: String,
        total: String,
      },
      reknow: {
        ca: String,
        exam: String,
        total: String,
      },
      he: {
        ca: String,
        exam: String,
        total: String,
      },
      sos: {
        ca: String,
        exam: String,
        total: String,
      },
      phe: {
        ca: String,
        exam: String,
        total: String,
      },
      yoruba: {
        ca: String,
        exam: String,
        total: String,
      },
      se: {
        ca: String,
        exam: String,
        total: String,
      },
      french: {
        ca: String,
        exam: String,
        total: String,
      },
      lit: {
        ca: String,
        exam: String,
        total: String,
      },
      comm: {
        ca: String,
        exam: String,
        total: String,
      },
      govt: {
        ca: String,
        exam: String,
        total: String,
      },
      vocap: {
        ca: String,
        exam: String,
        total: String,
      },
      current: {
        ca: String,
        exam: String,
        total: String,
      },
      moral: {
        ca: String,
        exam: String,
        total: String,
      },
      market: {
        ca: String,
        exam: String,
        total: String,
      },
      bio: {
        ca: String,
        exam: String,
        total: String,
      },
      crs: {
        ca: String,
        exam: String,
        total: String,
      },
      econ: {
        ca: String,
        exam: String,
        total: String,
      },
      phy: {
        ca: String,
        exam: String,
        total: String,
      },
      chem: {
        ca: String,
        exam: String,
        total: String,
      },
      fmath: {
        ca: String,
        exam: String,
        total: String,
      },
      geog: {
        ca: String,
        exam: String,
        total: String,
      },
      f_acc: {
        ca: String,
        exam: String,
        total: String,
      },
    },
    avg: { type: String, required: true },
    cumm: { type: String },
    teacher: { type: String, required: true },
    head: { type: String, required: true },
  },
  { timestamps: true }
);

// ResultSchema.set("strictQuery", true);

export default mongoose.models.Result || mongoose.model("Result", ResultSchema);
