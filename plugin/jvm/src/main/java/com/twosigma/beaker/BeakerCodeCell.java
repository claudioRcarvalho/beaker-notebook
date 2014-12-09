/*
 *  Copyright 2014 TWO SIGMA OPEN SOURCE, LLC
 *
 *  Licensed under the Apache License, Version 2.0 (the "License");
 *  you may not use this file except in compliance with the License.
 *  You may obtain a copy of the License at
 *
 *         http://www.apache.org/licenses/LICENSE-2.0
 *
 *  Unless required by applicable law or agreed to in writing, software
 *  distributed under the License is distributed on an "AS IS" BASIS,
 *  WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 *  See the License for the specific language governing permissions and
 *  limitations under the License.
 */

package com.twosigma.beaker;

import org.codehaus.jackson.annotate.JsonAutoDetect;

@JsonAutoDetect
public class BeakerCodeCell {
  private String cellId;
  private String evaluatorId;
  private String code;
  private String outputtype;
  private String output;
  private String tags;
  
  public BeakerCodeCell() { }

  public String getcellId() { return cellId; }
  public String getevaluatorId() { return evaluatorId; }
  public String getcode() { return code; }
  public String getoutputtype() { return outputtype; }
  public String getoutput() { return output; }
  public String gettags() { return tags; }

  public void setcellId(String s) { cellId = s; }
  public void setevaluatorId(String s) { evaluatorId = s; }
  public void setcode(String s) { code = s; }
  public void setoutputtype(String s) { outputtype = s; }
  public void setoutput(String s) { output = s; }
  public void settags(String s) { tags = s; }
  
}
